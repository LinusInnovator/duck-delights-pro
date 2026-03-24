import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '../app-template/.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Checking variants for duck site...");
  // First get the running experiment for duck
  const { data: exps } = await supabase.from('ab_experiments').select('*').eq('site_key', 'duck').eq('status', 'running');
  console.dir(exps, { depth: null });
  
  if (exps?.length > 0) {
      const exp = exps[0];
      const { data: variants } = await supabase.from('ab_variants').select('id, slot, impressions, conversions').eq('experiment_id', exp.id);
      console.dir(variants, { depth: null });
      
      console.log("Setting impressions back to normal by mapping tracking events!");
  }
}

check();
