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
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json({ success: true, ingested: { event, variant } });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
