"use client";

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';

const trackEvent = async (event: string, variant: string) => {
    try {
        await fetch('/api/track', {
            method: 'POST',
            keepalive: true, // ensure it fires even on navigation
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ event, variant })
        });
    } catch (e) { } // Silent fail
};

const DuckChat = dynamic(() => import('@/components/DuckChat'), {
    ssr: false,
    loading: () => <div className="font-bold text-red-600 animate-pulse p-4">LOADING DUCK_DEBUG.EXE...</div>
});

export default function UglySalesPage() {
    useEffect(() => {
        trackEvent('pageview', 'ugly');
    }, []);

    return (
        <div className="min-h-screen bg-white text-black font-[Times] p-4 text-center pb-24">
            <main className="max-w-3xl mx-auto border-4 border-red-600 border-dashed p-6 bg-[#ffffdd]">

                {/* Absolute chaotic headline */}
                <h1 className="text-4xl md:text-6xl font-black text-red-600 mb-6 uppercase leading-tight tracking-tighter">
                    <span className="bg-yellow-300">ATTENTION DEVELOPERS:</span><br />
                    Discover The *Secret Weapon* To Decimate Your Bugs Instantly!
                </h1>

                <p className="text-xl md:text-2xl font-bold mb-8 italic">
                    (Even if you're a complete beginner who copies from StackOverflow!)
                </p>

                <p className="text-lg text-left mb-6 font-bold">
                    Dear Frustrated Coder,
                </p>

                <p className="text-lg text-left mb-6">
                    Are you tired of staring at a blank screen for hours? Does a <span className="text-red-600 font-bold bg-yellow-300 px-1">NullReferenceException</span> make you want to throw your expensive MacBook out the window?
                </p>

                <div className="border-2 border-black bg-white p-4 my-8 relative">
                    <h2 className="text-2xl font-black text-blue-800 underline uppercase text-center mb-4">
                        Introducing: The AI Rubber Duck Debugger!
                    </h2>
                    <p className="text-left mb-4">
                        Back in the day, programmers talked to physical rubber ducks. IT WAS PATHETIC. Now, in 2026, you get a highly-cynical, hyper-intelligent AI companion that will ROAST your code until it compiles.
                    </p>
                    <ul className="text-left space-y-2 font-bold ml-6 list-disc text-blue-700">
                        <li>Never Google an error code again!</li>
                        <li>Stop getting embarrassed in code reviews!</li>
                        <li>Actually leave work at 5:00 PM!</li>
                    </ul>
                </div>

                <h3 className="text-3xl font-black text-red-600 my-8">
                    ⬇️ ⬇️ ⬇️ DO NOT WAIT! PRICE GOES UP AT MIDNIGHT! ⬇️ ⬇️ ⬇️
                </h3>

                <a
                    href="https://sell.delights.pro/p/cb7fyc3q"
                    onClick={() => trackEvent('checkout_click', 'ugly')}
                    className="animate-pulse bg-[#00ff00] text-black border-[4px] border-[#00ff00] px-4 py-2 font-black uppercase inline-block hover:bg-black hover:text-[#00ff00] hover:border-[#00ff00]"
                >
                    CLICK HERE TO DOWNLOAD DUCK.PROMPT ($5)
                </a>

                <p className="mt-8 text-sm italic font-bold">
                    PS: If you don't buy this, your next PR will contain a critical memory leak. I guarantee it.
                </p>

            </main>

            {/* The Floating AI Duck Component */}
            <DuckChat styleContext="ugly" />
            {/* Floating Meta Banner */}
            <div className="fixed bottom-0 left-0 right-0 bg-black text-[#00ff00] p-3 text-center border-t-4 border-[#00ff00] z-50 font-bold text-xs sm:text-sm md:text-base flex flex-col md:flex-row items-center justify-center gap-2">
                <span>[LIVE DATA]: This 1999 layout is currently winning an AI-driven A/B test.</span>
                <a href="https://improve.delights.pro/admin/sites/duck/heatmap" className="bg-[#00ff00] text-black px-3 py-1 hover:bg-white hover:text-red-600 transition-colors uppercase cursor-pointer whitespace-nowrap">
                    View The Live Heatmap
                </a>
            </div>
        </div>
    );
}
