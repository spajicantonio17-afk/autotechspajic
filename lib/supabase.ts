// Server-only Supabase client for the sales log (prodaje).
// The anon key is kept as a plain (non-NEXT_PUBLIC_) env var so it never
// reaches the browser bundle — same secrecy pattern as the Google Calendar
// service account key in lib/google-calendar.ts. Access to the actual
// /termin pages and /api routes is gated separately by the intern cookie.
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_ANON_KEY;

  if (!url || !key) {
    throw new Error(
      "Supabase nije konfiguriran (SUPABASE_URL / SUPABASE_ANON_KEY).",
    );
  }

  return createClient(url, key);
}

export { getSupabase };
