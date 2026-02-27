"use client";

import React from 'react';
import dynamic from 'next/dynamic';

const DuckChat = dynamic(() => import('@/components/DuckChat'), {
    ssr: false,
    loading: () => <div className="text-zinc-600 animate-pulse text-center p-12">Booting V8 Isolates...</div>
});

export default function ChatTestPage() {
    return (
        <div className="min-h-screen bg-black text-white py-16 px-4">
            <h1 className="text-3xl font-bold font-sans text-center mb-2 text-indigo-400">Duck.prompt Test Range</h1>
            <p className="text-center text-zinc-500 mb-8 max-w-lg mx-auto">
                This testing page has no rate limits. The duck is directly interpreting the `public/Duck.prompt.md` file you just wrote.
            </p>
            <DuckChat theme="pretty" unlimited={true} />
        </div>
    );
}
