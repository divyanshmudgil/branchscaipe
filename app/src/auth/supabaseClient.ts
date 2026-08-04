// Single Supabase client for the whole app. Reads credentials from Vite env
// vars (VITE_-prefixed so they're exposed to client code) — never hardcode
// these. See docs/SUPABASE_SETUP.md for how to obtain and set them.
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Set them in " +
      "app/.env.local for development (see docs/SUPABASE_SETUP.md) and in " +
      "Vercel project settings for Preview/Production.",
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
