import { NextRequest, NextResponse } from 'next/server';
import { createClient, isSupabaseServerConfigured } from '@/lib/supabase/server';
import { requireAdminUser } from '@/lib/supabase/auth-guard';
import { fallbackAbout } from '@/lib/supabase/data';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ data: fallbackAbout, source: 'fallback' });
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase.from('about_content').select('*').limit(1).maybeSingle();
    return NextResponse.json({ data: data || fallbackAbout });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching about content';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  try {
    const body = await req.json();

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({ data: body, source: 'preview' });
    }

    const supabase = await createClient();
    const { data: existing } = await supabase.from('about_content').select('id').limit(1).maybeSingle();

    const payload = {
      tag: body.tag,
      title: body.title,
      paragraph_1: body.paragraph_1,
      paragraph_2: body.paragraph_2,
      focus_blocks: body.focus_blocks,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (existing?.id) {
      result = await supabase.from('about_content').update(payload).eq('id', existing.id).select().single();
    } else {
      result = await supabase.from('about_content').insert(payload).select().single();
    }

    if (result.error) return NextResponse.json({ message: result.error.message }, { status: 500 });

    revalidatePath('/');
    return NextResponse.json({ data: result.data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating about content';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
