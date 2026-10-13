import { NextRequest, NextResponse } from 'next/server';
import { createClient, isSupabaseServerConfigured } from '@/lib/supabase/server';
import { requireAdminUser } from '@/lib/supabase/auth-guard';
import { fallbackExperiences } from '@/lib/supabase/data';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ data: fallbackExperiences, source: 'fallback' });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) return NextResponse.json({ message: error.message }, { status: 500 });
    return NextResponse.json({ data: data || [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching experiences';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  try {
    const body = await req.json();
    if (!body.title || !body.date_range) {
      return NextResponse.json({ message: 'Title and date range are required.' }, { status: 400 });
    }

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({ data: { ...body, id: body.id || `exp-${Date.now()}` }, source: 'preview' });
    }

    const supabase = await createClient();
    const payload = {
      type: body.type || 'experience',
      title: body.title,
      role_or_degree: body.role_or_degree || '',
      institution: body.institution || '',
      date_range: body.date_range,
      description: body.description || '',
      cert_url: body.cert_url || '',
      display_order: Number(body.display_order) || 0,
      is_visible: body.is_visible !== undefined ? Boolean(body.is_visible) : true,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (body.id && !body.id.startsWith('exp-') && !body.id.startsWith('edu-') && !body.id.startsWith('cert-')) {
      result = await supabase.from('experiences').update(payload).eq('id', body.id).select().single();
    } else {
      result = await supabase.from('experiences').insert(payload).select().single();
    }

    if (result.error) return NextResponse.json({ message: result.error.message }, { status: 500 });

    revalidatePath('/');
    return NextResponse.json({ data: result.data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error saving experience';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  try {
    const { id } = await req.json();
    if (!id) return NextResponse.json({ message: 'Missing record ID' }, { status: 400 });

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({ success: true, id });
    }

    const supabase = await createClient();
    const { error } = await supabase.from('experiences').delete().eq('id', id);
    if (error) return NextResponse.json({ message: error.message }, { status: 500 });

    revalidatePath('/');
    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting experience';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
