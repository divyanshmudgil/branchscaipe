import type { Session, User } from "@supabase/supabase-js";

export type AuthStatus = "loading" | "authenticated" | "guest" | "unauthenticated";

export interface AuthProfile {
  id: string;
  email: string | null;
  fullName: string | null;
  avatarUrl: string | null;
}

export interface AuthState {
  status: AuthStatus;
  session: Session | null;
  user: User | null;
  profile: AuthProfile | null;
  isGuest: boolean;
}
