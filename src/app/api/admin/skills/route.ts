import { NextRequest, NextResponse } from 'next/server';
import { createClient, isSupabaseServerConfigured } from '@/lib/supabase/server';
import { requireAdminUser } from '@/lib/supabase/auth-guard';
import { fallbackSkills } from '@/lib/supabase/data';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ data: fallbackSkills, source: 'fallback' });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) return NextResponse.json({ message: error.message }, { status: 500 });
    return NextResponse.json({ data: data || [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching skills';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.name || !body.category) {
      return NextResponse.json({ message: 'Skill name and category are required.' }, { status: 400 });
    }

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({ data: { ...body, id: body.id || `sk-${Date.now()}` }, source: 'preview' });
    }

    const supabase = await createClient();
    const payload = {
      name: body.name,
      category: body.category,
      level: body.level || 'Advanced',
      icon: body.icon || '',
      display_order: Number(body.display_order) || 0,
      is_visible: body.is_visible !== undefined ? Boolean(body.is_visible) : true,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (body.id && !body.id.startsWith('sk-')) {
      result = await supabase.from('skills').update(payload).eq('id', body.id).select().single();
    } else {
      result = await supabase.from('skills').insert(payload).select().single();
    }

    if (result.error) return NextResponse.json({ message: result.error.message }, { status: 500 });

    revalidatePath('/');
    return NextResponse.json({ data: result.data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error saving skill';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ message: 'Missing skill ID' }, { status: 400 });

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({ success: true, id });
    }

    const supabase = await createClient();
    const { error } = await supabase.from('skills').delete().eq('id', id);
    if (error) return NextResponse.json({ message: error.message }, { status: 500 });

    revalidatePath('/');
    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting skill';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
