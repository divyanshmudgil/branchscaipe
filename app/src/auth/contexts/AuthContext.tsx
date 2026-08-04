// AuthContext — the single source of truth for "who is using the app right
// now": a real Supabase session, a guest, or nobody yet (landing page).
// UI components should never call `supabase.auth.*` or touch the guest flag
// directly — go through useAuth() instead.
import React, { createContext, useEffect, useMemo, useState } from "react";
import { supabase } from "../supabaseClient";
import {
  clearGuestFlag,
  isGuestFlagSet,
  setGuestFlag,
  signInWithGoogle as signInWithGoogleService,
  signOut as signOutService,
  toProfile,
} from "../services/authService";
import type { AuthState, AuthStatus } from "../types";

export interface AuthContextValue extends AuthState {
  continueAsGuest: () => void;
  signInWithGoogle: () => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [session, setSession] = useState<AuthState["session"]>(null);

  useEffect(() => {
    let cancelled = false;

    supabase.auth.getSession().then(({ data }) => {
      if (cancelled) return;
      if (data.session) {
        setSession(data.session);
        setStatus("authenticated");
      } else if (isGuestFlagSet()) {
        setStatus("guest");
      } else {
        setStatus("unauthenticated");
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, newSession) => {
      if (cancelled) return;
      if (newSession) {
        clearGuestFlag(); // a real sign-in always wins over a stale guest flag
        setSession(newSession);
        setStatus("authenticated");
      } else {
        setSession(null);
        setStatus(isGuestFlagSet() ? "guest" : "unauthenticated");
      }
    });

    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  const continueAsGuest = () => {
    setGuestFlag();
    setStatus("guest");
  };

  const signOut = async () => {
    await signOutService();
    setSession(null);
    setStatus("unauthenticated");
  };

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      session,
      user: session?.user ?? null,
      profile: toProfile(session?.user ?? null),
      isGuest: status === "guest",
      continueAsGuest,
      signInWithGoogle: signInWithGoogleService,
      signOut,
    }),
    [status, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
