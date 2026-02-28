import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseUrl = rawUrl.startsWith('http') ? rawUrl : 'https://dummy.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'dummy_key';

// We use the service role key to securely insert telemetry data bypassing RLS
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
