import { supabase } from './supabase';
import type { User, Session } from '@supabase/supabase-js';

export const AUTHORIZED_ADMIN_EMAIL = 'vrindavanxyz@gmail.com';

export interface AdminAuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
}

/**
 * Verifies if the provided user object represents the authorized restaurant owner.
 */
export function isAuthorizedAdmin(user: User | null | undefined): boolean {
  if (!user || !user.email) return false;
  return user.email.toLowerCase().trim() === AUTHORIZED_ADMIN_EMAIL.toLowerCase();
}

/**
 * Authenticates the restaurant owner using Supabase Auth.
 * Rejects any non-matching email immediately for security.
 */
export async function signInOwner(emailInput: string, passwordInput: string) {
  const normalizedEmail = emailInput.trim().toLowerCase();

  if (normalizedEmail !== AUTHORIZED_ADMIN_EMAIL.toLowerCase()) {
    return {
      success: false,
      error: 'Access denied: Only the authorized owner account can sign in to this application.',
    };
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: normalizedEmail,
    password: passwordInput,
  });

  if (error) {
    let friendlyMessage = error.message;
    if (error.message.includes('Invalid login credentials')) {
      friendlyMessage = 'Incorrect password or email. Please check your credentials.';
    } else if (error.message.includes('Email not confirmed')) {
      friendlyMessage = 'Email address not yet confirmed. Please verify your email inbox or check your Supabase dashboard.';
    }
    return {
      success: false,
      error: friendlyMessage,
    };
  }

  if (!isAuthorizedAdmin(data.user)) {
    await supabase.auth.signOut();
    return {
      success: false,
      error: 'Unauthorized account. Privileges restricted.',
    };
  }

  return {
    success: true,
    user: data.user,
    session: data.session,
  };
}

/**
 * Signs the owner out of the application and clears the session.
 */
export async function signOutOwner() {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('[AdminAuth] Sign out error:', error.message);
  }
}

/**
 * Retrieves the currently active admin session.
 */
export async function getAdminSession() {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error || !session || !isAuthorizedAdmin(session.user)) {
    return null;
  }
  return session;
}
