// lib/supabase/admin.ts
import { createClient } from '@supabase/supabase-js';

export const supabaseAdminClient = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SECRET_KEY!, // ⚠ must be service role
  {
    auth: { persistSession: false, autoRefreshToken: false },
  }
);