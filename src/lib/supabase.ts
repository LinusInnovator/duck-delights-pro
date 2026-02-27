import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// We use the service role key to securely insert telemetry data bypassing RLS
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
