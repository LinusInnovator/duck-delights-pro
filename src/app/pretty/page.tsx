"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { Terminal, Bug, Cpu, Lightning } from '@phosphor-icons/react/dist/ssr';

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
    loading: () => <div className="text-zinc-600 animate-pulse text-center p-12">Booting V8 Isolates...</div>
});

export default function PrettyLandingPage() {
    useEffect(() => {
        trackEvent('pageview', 'pretty');
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-indigo-500/30 overflow-hidden relative">

            {/* Ambient glowing orbs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full mix-blend-screen pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none" />

            <main className="max-w-5xl mx-auto px-6 py-24 relative z-10 flex flex-col items-center text-center">

                {/* Hero Asset */}
                <div className="relative w-48 h-48 md:w-64 md:h-64 mb-6 z-20 mx-auto transition-transform duration-700 hover:scale-105 hover:-translate-y-2">
                    {/* Subtle glow effect behind ducky */}
                    <div className="absolute inset-10 bg-yellow-400/20 blur-[50px] rounded-full pointer-events-none" />
                    <Image
                        src="/ducky.png"
                        alt="The Autonomous Rubber Duck"
                        fill
                        className="object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]"
                        priority
                    />
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs text-zinc-400 mb-8 ring-1 ring-white/5 shadow-2xl">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                    Ship faster, debug smarter
                </div>

                {/* Headline */}
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 bg-gradient-to-br from-white via-zinc-200 to-zinc-500 text-transparent bg-clip-text">
                    The autonomous <br />
                    rubber duck debugger.
                </h1>

                <p className="text-lg md:text-xl text-zinc-400 max-w-2xl mb-12 leading-relaxed">
                    Stop staring at StackOverflow. Integrate a highly-trained, cynical AI companion directly into your workflow to instantly identify failing logic, roast your syntax, and write flawless fixes.
                </p>

                {/* Primary CTA */}
                <div className="flex flex-col sm:flex-row gap-4 mb-24">
                    <a
                        href="https://sell.delights.pro/p/cb7fyc3q"
                        onClick={() => trackEvent('checkout_click', 'pretty')}
                        className="group relative inline-flex items-center justify-center gap-2 bg-zinc-100 text-zinc-950 px-8 py-3.5 rounded-xl font-medium transition-all hover:bg-white hover:scale-105 active:scale-95"
                    >
                        <Terminal weight="bold" className="w-5 h-5" />
                        Initialize License ($5)
                    </a>
                    <button className="inline-flex items-center justify-center gap-2 bg-zinc-900 text-zinc-300 px-8 py-3.5 rounded-xl font-medium border border-zinc-800 hover:bg-zinc-800 transition-colors">
                        View Documentation
                    </button>
                </div>

                {/* Feature Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full text-left">

                    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-6 text-indigo-400">
                            <Bug weight="duotone" className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-200 mb-2">Instant Remediation</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Paste your error stack. The AI identifies the exact memory leak or syntactical oversight in milliseconds.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-6 text-purple-400">
                            <Cpu weight="duotone" className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-200 mb-2">Cynical Mode</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Toggle "Roast Mode" to have the AI ruthlessly critique your O(n^2) algorithms and poor variable naming.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800/50 backdrop-blur-sm">
                        <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center mb-6 text-emerald-400">
                            <Lightning weight="duotone" className="w-6 h-6" />
                        </div>
                        <h3 className="text-lg font-semibold text-zinc-200 mb-2">Zero Latency</h3>
                        <p className="text-sm text-zinc-500 leading-relaxed">
                            Built on V8 isolates. The debugger runs locally in your terminal to ensure completely private codebase analysis.
                        </p>
                    </div>

                </div>

                {/* INTERACTIVE DEMO INJECTION */}
                <section className="w-full mt-24 relative z-20" id="interactive-demo">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 text-transparent bg-clip-text">Experience the Autonomy.</h2>
                        <p className="text-zinc-400 mt-2">Paste a real bug below. The AI Duck will diagnose it live.</p>
                    </div>
                    <DuckChat styleContext="pretty" />
                </section>

                {/* Testimonial Section */}
                <section className="w-full mt-32 relative z-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-zinc-100">Loved by teams who ship on Fridays.</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
                        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
                            <div className="flex gap-1 text-indigo-400 mb-4">★★★★★</div>
                            <p className="text-zinc-300 mb-6 italic">"The Ducky literally found an async race condition in my Redux state that my senior developer missed. It roasted me, but it saved my weekend."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-500">S</div>
                                <div>
                                    <div className="text-sm font-semibold text-zinc-200">Sarah J.</div>
                                    <div className="text-xs text-zinc-500">Frontend Lead</div>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/50">
                            <div className="flex gap-1 text-indigo-400 mb-4">★★★★★</div>
                            <p className="text-zinc-300 mb-6 italic">"I bought the $5 license purely as a joke for the office Slack. Turns out The Duck is basically a Staff Engineer that never sleeps."</p>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-zinc-500">D</div>
                                <div>
                                    <div className="text-sm font-semibold text-zinc-200">David M.</div>
                                    <div className="text-xs text-zinc-500">CTO</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Final CTA Section */}
                <section className="w-full mt-32 mb-16 relative z-20 text-center">
                    <div className="p-12 rounded-3xl bg-gradient-to-b from-indigo-900/20 to-zinc-900 border border-indigo-500/20 max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-zinc-100 mb-6">Stop guessing. Start fixing.</h2>
                        <p className="text-zinc-400 mb-8 max-w-lg mx-auto">Join thousands of developers using the AI Rubber Duck to slash debugging time by 80%.</p>
                        <a
                            href="https://sell.delights.pro/p/cb7fyc3q"
                            onClick={() => trackEvent('checkout_click', 'pretty')}
                            className="mx-auto mt-6 bg-white shrink-0 text-indigo-950 font-bold px-8 py-4 rounded-full flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-xl shadow-indigo-500/20"
                        >
                            Get Unlimited License — $5
                        </a>
                        <p className="mt-6 text-xs text-zinc-500">One-time payment. Requires your own OpenAI API key.</p>
                    </div>
                </section>

            </main>

            {/* Floating Meta Banner */}
            <div className="fixed bottom-0 left-0 right-0 bg-indigo-600/90 text-white p-3 text-center z-50 font-medium text-sm backdrop-blur-md border-t border-indigo-500/50 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
                <span><span className="font-bold flex items-center inline-flex gap-2"><div className="w-2 h-2 rounded-full bg-white animate-pulse" /> LIVE DATA:</span> This beautiful layout is currently losing an AI-driven A/B test.</span>
                <a href="https://improve.delights.pro/admin/sites/duck/heatmap" className="bg-white/20 hover:bg-white text-white hover:text-indigo-900 px-4 py-1.5 rounded-full transition-colors text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                    View The Real-time Stats →
                </a>
            </div>
        </div>
    );
}
