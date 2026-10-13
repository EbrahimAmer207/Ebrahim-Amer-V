import { NextRequest, NextResponse } from 'next/server';
import { createClient, isSupabaseServerConfigured } from '@/lib/supabase/server';
import { requireAdminUser } from '@/lib/supabase/auth-guard';
import { fallbackSiteSettings } from '@/lib/supabase/data';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ data: fallbackSiteSettings, source: 'fallback' });
  }

  try {
    const supabase = await createClient();
    const { data } = await supabase.from('site_settings').select('*').limit(1).maybeSingle();
    return NextResponse.json({ data: data || fallbackSiteSettings });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching site settings';
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
    const { data: existing } = await supabase.from('site_settings').select('id').limit(1).maybeSingle();

    const payload = {
      email: body.email,
      phone: body.phone,
      location: body.location,
      linkedin_url: body.linkedin_url,
      github_url: body.github_url,
      site_title: body.site_title,
      meta_description: body.meta_description,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (existing?.id) {
      result = await supabase.from('site_settings').update(payload).eq('id', existing.id).select().single();
    } else {
      result = await supabase.from('site_settings').insert(payload).select().single();
    }

    if (result.error) return NextResponse.json({ message: result.error.message }, { status: 500 });

    revalidatePath('/');
    return NextResponse.json({ data: result.data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating site settings';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
