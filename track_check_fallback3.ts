import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '../app-template/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    const { data: exps } = await supabase.from('ab_experiments')
        .select('id, site_key, status, element')
        .eq('site_key', 'duck');
    console.log("Experiments for site_key = 'duck':", exps);

    if (exps?.length > 0) {
        const { data: variants } = await supabase.from('ab_variants')
            .select('id, experiment_id, slot, impressions, conversions')
            .eq('experiment_id', exps[0].id);
        console.log("Variants for the first exp:", variants);
    }
}
check();
