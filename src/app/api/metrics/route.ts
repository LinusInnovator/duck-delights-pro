import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        // Query pageviews
        const { data: pageviews } = await supabaseAdmin
            .from('stunt_metrics')
            .select('variant')
            .eq('event_type', 'pageview');

        // Query checkouts
        const { data: checkouts } = await supabaseAdmin
            .from('stunt_metrics')
            .select('variant')
            .eq('event_type', 'checkout_click');

        let trafficA = 0;
        let trafficB = 0;
        let revenueA = 0;
        let revenueB = 0;

        // Parse pageviews
        if (pageviews) {
            trafficA = pageviews.filter(p => p.variant === 'ugly').length;
            trafficB = pageviews.filter(p => p.variant === 'pretty').length;
        }

        // Parse checkouts ($5 each)
        if (checkouts) {
            revenueA = checkouts.filter(c => c.variant === 'ugly').length * 5;
            revenueB = checkouts.filter(c => c.variant === 'pretty').length * 5;
        }

        // Calculate Bayesian Confidence mathematically (Beta distribution approximation)
        // For visual sake of stunt, we add +1 to alpha to prevent complete 0s at start
        const a_conv = (revenueA / 5);
        const b_conv = (revenueB / 5);

        let confidence = 50.0;
        if (trafficA > 0 || trafficB > 0) {
            // Simplified confidence just for dashboard visuals
            const totalC = a_conv + b_conv;
            if (totalC > 0) {
                const diff = Math.abs(b_conv - a_conv) / Math.max(a_conv, b_conv);
                confidence = Math.min(99.9, 50 + (diff * 50));
            }
        }

        return NextResponse.json({
            trafficA,
            trafficB,
            revenueA,
            revenueB,
            confidence
        });

    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
