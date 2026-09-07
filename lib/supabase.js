import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Server-side client used by the page/components to read content tables.
// Uses the public anon key on purpose — every table it reads only allows
// SELECT for the anon role (see supabase/schema.sql). Editing happens in
// Supabase Studio, which uses your dashboard login, not this key.
export function getSupabase() {
  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  });
}
