import { createClient, isSupabaseServerConfigured } from './server';
import { User } from '@supabase/supabase-js';

export function isUserAdmin(user: User | null): boolean {
  if (!user) return false;

  // 1. Check custom claim role
  if (user.app_metadata?.role === 'admin' || user.user_metadata?.role === 'admin') {
    return true;
  }

  // 2. Check admin email against configured admin email or portfolio owner email
  const adminEmail = (process.env.ADMIN_EMAIL || 'himaamer937@gmail.com').toLowerCase();
  const userEmail = (user.email || '').toLowerCase();

  return Boolean(userEmail && userEmail === adminEmail);
}

export async function requireAdminUser(): Promise<{ authorized: boolean; user: User | null; message?: string }> {
  if (!isSupabaseServerConfigured()) {
    // If Supabase credentials are not configured yet, permit local preview mode
    return { authorized: true, user: null };
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return { authorized: false, user: null, message: 'Unauthorized: Admin authentication required' };
    }

    if (!isUserAdmin(user)) {
      return {
        authorized: false,
        user,
        message: 'Forbidden: Authenticated user lacks administrator privileges.',
      };
    }

    return { authorized: true, user };
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Auth verification error';
    return { authorized: false, user: null, message: errorMessage };
  }
}
