"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Terminal, Lightning } from '@phosphor-icons/react/dist/ssr';

const trackEvent = async (event: string, variant: string) => {
    try {
        await fetch('/api/track', {
            method: 'POST',
            keepalive: true,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event, variant })
        });
    } catch (e) { } // Silent fail
};

const DuckChat = dynamic(() => import('@/components/DuckChat'), {
    ssr: false,
    loading: () => <div className="text-zinc-600 animate-pulse text-center p-12 font-mono">Booting Neural Matrix...</div>
});

export default function PremiumChatInterface() {
    useEffect(() => {
        trackEvent('pageview', 'premium_chat');
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-white font-sans selection:bg-indigo-500/30">
            {/* Global Lead Gen Banner */}
            <div className="w-full bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 animate-gradient-x text-center py-3 px-4 border-b border-white/10 sticky top-0 z-50">
                <div className="text-sm font-medium text-white flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4">
                    <span className="animate-pulse w-2 h-2 rounded-full bg-white hidden sm:block shrink-0"></span>
                    <span className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                        <strong>Want autonomous AI conversions on your own site?</strong>
                        <span className="text-indigo-100 hidden sm:inline">Discover the engine that built this Ducky stunt.</span>
                    </span>
                    <a href="https://improve.delights.pro/auth" className="mt-2 md:mt-0 bg-white text-indigo-900 px-5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:scale-105 active:scale-95 transition-all shadow-lg whitespace-nowrap">Try Improve.Delights →</a>
                </div>
            </div>

            <main className="max-w-4xl mx-auto px-4 py-8 md:py-24 relative">
                {/* Ambient Backgrounds */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-[400px] bg-indigo-600/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center text-center mb-10 md:mb-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-emerald-400 mb-6 font-semibold uppercase tracking-widest shadow-xl">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        License Active
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 md:mb-6 bg-gradient-to-b from-white to-zinc-400 text-transparent bg-clip-text leading-tight">
                        Mobile Terminal
                    </h1>

                    <p className="text-zinc-400 text-base md:text-xl max-w-2xl leading-relaxed">
                        Away from your IDE? Your AI companion is online.
                        Paste a snippet or drop an error log right here from your phone.
                    </p>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-3xl p-2 md:p-6 shadow-2xl backdrop-blur-xl relative z-10">
                    <div className="flex items-center gap-2 mb-2 md:mb-4 px-4 pt-4 md:pt-0">
                        <Terminal className="text-zinc-500" size={20} />
                        <span className="text-xs font-mono text-zinc-500">duck_debug.exe --mobile-viewer</span>
                        <div className="ml-auto flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                            <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                            <div className="w-3 h-3 rounded-full bg-zinc-800"></div>
                        </div>
                    </div>
                    <DuckChat styleContext="pretty" unlimited={true} />
                </div>

                {/* Lead Gen Footer */}
                <div className="mt-16 md:mt-24 p-6 md:p-12 rounded-3xl bg-gradient-to-br from-indigo-900/40 to-zinc-900 border border-indigo-500/20 text-center relative overflow-hidden z-10">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/10 blur-[80px] rounded-full pointer-events-none" />
                    <Lightning weight="duotone" className="text-indigo-400 w-12 h-12 flex-shrink-0 mx-auto mb-4" />
                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Turn Your Traffic into Revenue</h2>
                    <p className="text-zinc-400 max-w-xl mx-auto mb-8 text-sm md:text-base leading-relaxed">
                        The Ducky stunt you're experiencing is powered by <strong>improve.delights</strong>,
                        our autonomous A/B testing engine that rewrites React components on the fly to maximize conversions.
                    </p>
                    <a
                        href="https://improve.delights.pro/auth"
                        className="inline-block bg-white text-zinc-950 hover:bg-zinc-200 px-6 py-3.5 md:px-8 md:py-4 rounded-xl font-bold transition-transform hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                    >
                        Deploy to your project today
                    </a>
                </div>
            </main>
        </div>
    );
}
