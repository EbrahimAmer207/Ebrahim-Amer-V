import { NextRequest, NextResponse } from 'next/server';
import { createClient, isSupabaseServerConfigured } from '@/lib/supabase/server';
import { requireAdminUser } from '@/lib/supabase/auth-guard';
import { fallbackProjects } from '@/lib/supabase/data';
import { revalidatePath } from 'next/cache';

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.authorized) {
    return NextResponse.json({ message: auth.message }, { status: 401 });
  }

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({
      data: fallbackProjects,
      source: 'fallback',
      message: 'Running in local verified data mode (configure .env.local to persist directly to Supabase).',
    });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    return NextResponse.json({ data: data || [] });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Failed to fetch projects';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.authorized) {
    return NextResponse.json({ message: auth.message }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Validation
    if (!body.title || !body.slug || !body.description) {
      return NextResponse.json(
        { message: 'Validation error: title, slug, and description are required.' },
        { status: 400 }
      );
    }

    // Slug sanitize
    const cleanSlug = body.slug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-');

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        data: { ...body, slug: cleanSlug, id: body.id || `proj-${Date.now()}` },
        source: 'preview',
        message: 'Saved in preview mode. To persist permanently, connect your Supabase PostgreSQL project.',
      });
    }

    const supabase = await createClient();

    // Check slug uniqueness if creating new or changing slug
    const { data: existing } = await supabase
      .from('projects')
      .select('id, slug')
      .eq('slug', cleanSlug)
      .maybeSingle();

    if (existing && existing.id !== body.id) {
      return NextResponse.json(
        { message: `A project with slug "${cleanSlug}" already exists. Please choose a unique slug.` },
        { status: 400 }
      );
    }

    const payload = {
      slug: cleanSlug,
      title: body.title,
      category: body.category || 'Engineering',
      demo_url: body.demo_url || '',
      code_url: body.code_url || '',
      is_private_code: Boolean(body.is_private_code),
      brand_name_arabic: body.brand_name_arabic || '',
      description: body.description,
      long_description: body.long_description || body.description,
      tech: Array.isArray(body.tech) ? body.tech : [],
      metrics: Array.isArray(body.metrics) ? body.metrics : [],
      story: body.story || {},
      challenges: Array.isArray(body.challenges) ? body.challenges : [],
      outcomes: Array.isArray(body.outcomes) ? body.outcomes : [],
      screenshots: Array.isArray(body.screenshots) ? body.screenshots : [],
      featured: Boolean(body.featured),
      is_published: body.is_published !== undefined ? Boolean(body.is_published) : true,
      display_order: Number(body.display_order) || 0,
      updated_at: new Date().toISOString(),
    };

    let result;
    if (body.id && !body.id.startsWith('proj-') && !body.id.startsWith('project-')) {
      // Update existing record
      result = await supabase
        .from('projects')
        .update(payload)
        .eq('id', body.id)
        .select()
        .single();
    } else {
      // Insert new record
      result = await supabase
        .from('projects')
        .insert(payload)
        .select()
        .single();
    }

    if (result.error) {
      return NextResponse.json({ message: result.error.message }, { status: 500 });
    }

    // Revalidate public portfolio pages
    revalidatePath('/');
    revalidatePath(`/projects/${cleanSlug}`);

    return NextResponse.json({ data: result.data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Server error saving project';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
