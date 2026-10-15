import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only handle dashboard routes
  if (!pathname.startsWith('/dashboard')) {
    return NextResponse.next();
  }

  // Do not redirect login page or auth callbacks
  if (pathname === '/dashboard/login' || pathname.startsWith('/dashboard/auth')) {
    return NextResponse.next();
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabasePublishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not configured yet, let user view dashboard with configuration notice
  if (!supabaseUrl || !supabasePublishableKey || !supabaseUrl.startsWith('http')) {
    return NextResponse.next();
  }

  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: Record<string, unknown> }>) {
        cookiesToSet.forEach(({ name, value }) => {
          request.cookies.set(name, value);
        });
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If unauthenticated, redirect to login
  if (!user) {
    const loginUrl = new URL('/dashboard/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Verify user is the intended administrator (by custom claim or email)
  const adminEmail = (process.env.ADMIN_EMAIL || 'himaamer937@gmail.com').toLowerCase();
  const userEmail = (user.email || '').toLowerCase();
  const isAdmin =
    user.app_metadata?.role === 'admin' ||
    user.user_metadata?.role === 'admin' ||
    (Boolean(userEmail) && userEmail === adminEmail);

  if (!isAdmin) {
    const loginUrl = new URL('/dashboard/login', request.url);
    loginUrl.searchParams.set('error', 'unauthorized_account');
    return NextResponse.redirect(loginUrl);
  }

  return response;
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
