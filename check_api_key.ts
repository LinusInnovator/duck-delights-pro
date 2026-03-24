import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { createHash } from 'crypto';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const apiKey = process.env.IMPROVE_API_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    if (!apiKey) {
        console.log("No API Key in env.");
        return;
    }
    const tokenHash = createHash('sha256').update(apiKey).digest('hex');
    const { data } = await supabase.from('api_keys').select('*').eq('token_hash', tokenHash).single();
    console.log("API Key maps to site_key:", data?.site_key);
}
check();
