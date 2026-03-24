import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '../app-template/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data: exps } = await supabase.from('ab_experiments')
      .select('id, site_key, status, element');
    const { data: variants } = await supabase.from('ab_variants')
      .select('experiment_id');

    const counts = {};
    for (const v of variants) {
        counts[v.experiment_id] = (counts[v.experiment_id] || 0) + 1;
    }
    
    for (const e of exps) {
        if (counts[e.id] === 8) {
            console.log(`Experiment with 8 variants:`, e);
        }
    }
}

check();
