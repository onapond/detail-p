import { createServerSupabaseClient } from './server';
import type { User } from '@supabase/supabase-js';

/**
 * Get authenticated user from server-side Supabase client.
 * Returns user object or null if not authenticated.
 */
export async function getAuthUser(): Promise<User | null> {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();
  return user;
}

/**
 * Type guard for Supabase auth errors
 */
export function isAuthError(error: unknown): error is { message: string; status: number } {
  return (
    typeof error === 'object' &&
    error !== null &&
    'message' in error &&
    'status' in error
  );
}
