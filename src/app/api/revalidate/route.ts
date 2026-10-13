import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request: NextRequest) {
  try {
    const { path, secret } = await request.json();

    const expectedSecret = process.env.REVALIDATION_SECRET || 'ebrahim-portfolio-cms-revalidate-secret-2026';

    if (secret !== expectedSecret) {
      return NextResponse.json({ message: 'Unauthorized secret token' }, { status: 401 });
    }

    if (!path) {
      return NextResponse.json({ message: 'Missing path argument' }, { status: 400 });
    }

    // Revalidate requested path
    revalidatePath(path);

    return NextResponse.json({
      revalidated: true,
      path,
      now: Date.now(),
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown revalidation error';
    return NextResponse.json({ message: errorMessage }, { status: 500 });
  }
}
