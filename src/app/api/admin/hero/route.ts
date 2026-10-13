import { NextRequest, NextResponse } from 'next/server';
import { createClient, isSupabaseServerConfigured } from '@/lib/supabase/server';
import { requireAdminUser } from '@/lib/supabase/auth-guard';
import { fallbackHero } from '@/lib/supabase/data';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ data: fallbackHero, source: 'fallback' });
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase.from('hero_content').select('*').limit(1).maybeSingle();
    return NextResponse.json({ data: data || fallbackHero });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching hero content';
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
    const { data: existing } = await supabase.from('hero_content').select('id').limit(1).maybeSingle();

    const payload = {
      badge_text: body.badge_text,
      title_line_1: body.title_line_1,
      title_line_2: body.title_line_2,
      title_line_3: body.title_line_3,
      description: body.description,
      primary_cta_label: body.primary_cta_label,
      primary_cta_link: body.primary_cta_link,
      secondary_cta_label: body.secondary_cta_label,
      secondary_cta_link: body.secondary_cta_link,
      cv_download_url: body.cv_download_url,
      cv_download_filename: body.cv_download_filename,
      profile_image_url: body.profile_image_url,
      proof_metrics: body.proof_metrics,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (existing?.id) {
      result = await supabase.from('hero_content').update(payload).eq('id', existing.id).select().single();
    } else {
      result = await supabase.from('hero_content').insert(payload).select().single();
    }

    if (result.error) return NextResponse.json({ message: result.error.message }, { status: 500 });

    revalidatePath('/');
    return NextResponse.json({ data: result.data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating hero';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
