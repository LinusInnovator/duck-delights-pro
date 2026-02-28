import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    try {
        const { event, variant } = await req.json();

        if (!event || !variant) {
            return NextResponse.json({ error: 'Missing event or variant payload' }, { status: 400 });
        }

        const { error } = await supabaseAdmin
            .from('stunt_metrics')
            .insert({
                event_type: event,
                variant: variant
            });

        if (error) {
            console.error('Telemtry ingestion failed:', error);
            // Optionally fail soft
        }

        // Headless Enterprise Tracking Proxy
        const apiKey = process.env.IMPROVE_API_KEY;
        if (apiKey) {
            // A visitor ID is usually required. We can generate a random one for this stateless stunt
            const visitorId = `duck_${Math.random().toString(36).substring(7)}`;

            // Re-map variant slot to an ID if we have one, otherwise just send the slot 
            // Note: The Headless API expects variant_id, visitor_id, event
            await fetch('https://improve.delights.pro/api/v1/headless/track', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    variant_id: variant, // we are passing 'champion'/'challenger' currently
                    visitor_id: visitorId,
                    event: event === 'pageview' ? 'impression' : 'conversion',
                    value: event === 'checkout_click' ? 5 : 0 // $5 license
                })
            }).catch(e => console.error('Headless proxy failed', e));
        }

        return NextResponse.json({ success: true, ingested: { event, variant } });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
