import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient(server = false) {
  const url = process.env.SUPABASE_URL!;
  const key = server
    ? (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY)!
    : process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY!;
  return createClient(url, key);
}