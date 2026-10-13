import { NextRequest, NextResponse } from 'next/server';
import { createClient, isSupabaseServerConfigured } from '@/lib/supabase/server';
import { requireAdminUser } from '@/lib/supabase/auth-guard';

export async function GET() {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  // List existing built-in assets as base media library
  const builtInAssets = [
    { id: 'm-1', filename: 'profile.jpg', public_url: '/Img/profile.jpg', storage_path: 'local/profile.jpg' },
    { id: 'm-2', filename: 'image copy.png', public_url: '/Img/image copy.png', storage_path: 'local/growfet.png' },
    { id: 'm-3', filename: 'image.png', public_url: '/Img/image.png', storage_path: 'local/rashet-etr.png' },
    { id: 'm-4', filename: 'image copy 2.png', public_url: '/Img/image copy 2.png', storage_path: 'local/growfet-tech.png' },
    { id: 'm-5', filename: 'luxe-ecommerce.png', public_url: '/Img/luxe-ecommerce.png', storage_path: 'local/luxe.png' },
    { id: 'm-6', filename: '4.png', public_url: '/Img/4.png', storage_path: 'local/aetheria.png' },
    { id: 'm-7', filename: 'fake.png', public_url: '/Img/fake.png', storage_path: 'local/apex.png' },
    { id: 'm-8', filename: 'Dash.png', public_url: '/Img/Dash.png', storage_path: 'local/nexus.png' },
    { id: 'm-9', filename: 'we.png', public_url: '/Img/we.png', storage_path: 'local/nimbus.png' },
  ];

  if (!isSupabaseServerConfigured()) {
    return NextResponse.json({ data: builtInAssets });
  }

  try {
    const supabase = await createClient();
    const { data: dbAssets, error } = await supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json({ data: builtInAssets });
    }

    return NextResponse.json({ data: [...(dbAssets || []), ...builtInAssets] });
  } catch {
    return NextResponse.json({ data: builtInAssets });
  }
}

export async function POST(req: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ message: 'No file uploaded' }, { status: 400 });
    }

    // Validate size (max 8MB)
    const MAX_SIZE = 8 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ message: 'File size exceeds maximum 8MB limit' }, { status: 400 });
    }

    // Validate type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { message: 'Invalid file format. Allowed types: JPG, PNG, WebP, SVG, PDF' },
        { status: 400 }
      );
    }

    const timestamp = Date.now();
    const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const storagePath = `uploads/${timestamp}_${cleanName}`;

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({
        data: {
          id: `local-${timestamp}`,
          filename: file.name,
          storage_path: storagePath,
          public_url: `/Img/${cleanName}`,
          size_bytes: file.size,
          mime_type: file.type,
        },
        message: 'Uploaded in preview mode. Configure Supabase Storage bucket for permanent cloud CDN hosting.',
      });
    }

    const supabase = await createClient();
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('portfolio-media')
      .upload(storagePath, buffer, {
        contentType: file.type,
        upsert: true,
      });

    if (uploadError) {
      return NextResponse.json({ message: uploadError.message }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('portfolio-media')
      .getPublicUrl(storagePath);

    const publicUrl = urlData.publicUrl;

    // Record in media_assets table
    const { data: assetRecord, error: dbError } = await supabase
      .from('media_assets')
      .insert({
        filename: file.name,
        storage_path: storagePath,
        public_url: publicUrl,
        size_bytes: file.size,
        mime_type: file.type,
      })
      .select()
      .single();

    if (dbError) {
      return NextResponse.json({
        data: {
          filename: file.name,
          public_url: publicUrl,
          storage_path: storagePath,
        },
      });
    }

    return NextResponse.json({ data: assetRecord });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Upload processing error';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const auth = await requireAdminUser();
  if (!auth.authorized) return NextResponse.json({ message: auth.message }, { status: 401 });

  try {
    const { id, storage_path } = await req.json();
    if (!id) return NextResponse.json({ message: 'Missing media asset ID' }, { status: 400 });

    if (!isSupabaseServerConfigured()) {
      return NextResponse.json({ success: true, id });
    }

    const supabase = await createClient();

    if (storage_path && !storage_path.startsWith('local/')) {
      await supabase.storage.from('portfolio-media').remove([storage_path]);
    }

    await supabase.from('media_assets').delete().eq('id', id);

    return NextResponse.json({ success: true, id });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : 'Error deleting media asset';
    return NextResponse.json({ message: msg }, { status: 500 });
  }
}
