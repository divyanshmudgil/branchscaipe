// authService — the only place that talks to Supabase Auth directly and the
// only place that owns the guest-mode flag. Everything else (contexts,
// components) goes through these functions rather than calling `supabase`
// or `sessionStorage` themselves.
import { supabase } from "../supabaseClient";
import type { AuthProfile } from "../types";
import type { User } from "@supabase/supabase-js";

const GUEST_FLAG_KEY = "bsc.auth.guest";

export function signInWithGoogle(): Promise<{ error: string | null }> {
  return supabase.auth
    .signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    })
    .then(({ error }) => ({ error: error?.message ?? null }));
}

export async function signOut(): Promise<void> {
  clearGuestFlag();
  await supabase.auth.signOut();
}

export function toProfile(user: User | null): AuthProfile | null {
  if (!user) return null;
  const meta = user.user_metadata ?? {};
  return {
    id: user.id,
    email: user.email ?? null,
    fullName: meta.full_name ?? meta.name ?? null,
    avatarUrl: meta.avatar_url ?? meta.picture ?? null,
  };
}

// ── guest mode — sessionStorage only, never touches Supabase or persists
// past the current tab's session, matching the "temporary by design" spec ──
export function isGuestFlagSet(): boolean {
  try {
    return sessionStorage.getItem(GUEST_FLAG_KEY) === "1";
  } catch {
    return false;
  }
}

export function setGuestFlag(): void {
  try {
    sessionStorage.setItem(GUEST_FLAG_KEY, "1");
  } catch {
    // sessionStorage unavailable (private mode, etc.) — guest mode still
    // works for the current in-memory session, it just won't survive reload
  }
}

export function clearGuestFlag(): void {
  try {
    sessionStorage.removeItem(GUEST_FLAG_KEY);
  } catch {
    // ignore
  }
}
