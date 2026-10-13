import { NextRequest, NextResponse } from 'next/server';
import { createClient, isSupabaseServerConfigured } from '@/lib/supabase/server';
import { requireAdminUser } from '@/lib/supabase/auth-guard';
import { fallbackProjects } from '@/lib/supabase/data';
import { revalidatePath } from 'next/cache';

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteProps) {
  const auth = await requireAdminUser();
  if (!auth.authorized) {
    return NextResponse.json({ message: auth.message }, { status: 401 });
  }

  const { id } = await params;

  if (!isSupabaseServerConfigured()) {
    const found = fallbackProjects.find(p => p.id === id || p.slug === id);
    if (!found) return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    return NextResponse.json({ data: found });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error fetching project';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: RouteProps) {
  const auth = await requireAdminUser();
  if (!auth.authorized) {
    return NextResponse.json({ message: auth.message }, { status: 401 });
  }

  const { id } = await params;

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({
      success: true,
      id,
      message: 'Deleted in preview mode (configure Supabase to persist deletions to PostgreSQL).',
    });
  }

  try {
    const supabase = await createClient();

    // Fetch slug first to revalidate page cache
    const { data: proj } = await supabase
      .from('projects')
      .select('slug')
      .eq('id', id)
      .maybeSingle();

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', id);

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    revalidatePath('/');
    if (proj?.slug) {
      revalidatePath(`/projects/${proj.slug}`);
    }

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting project';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, { params }: RouteProps) {
  const auth = await requireAdminUser();
  if (!auth.authorized) {
    return NextResponse.json({ message: auth.message }, { status: 401 });
  }

  const { id } = await params;
  const updates = await req.json();

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ success: true, id, updates });
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }

    revalidatePath('/');
    if (data?.slug) {
      revalidatePath(`/projects/${data.slug}`);
    }

    return NextResponse.json({ data });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error updating project';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
