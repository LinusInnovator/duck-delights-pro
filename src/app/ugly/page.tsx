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
                    href="https://sell.delights.pro/checkout"
                    onClick={() => trackEvent('checkout_click', 'ugly')}
                    className="inline-block bg-[#00ff00] hover:bg-yellow-400 text-black text-4xl font-black uppercase p-8 rounded-none border-b-8 border-r-8 border-black transform active:translate-y-2 active:border-b-0 active:border-r-0 transition-all"
                >
                    &gt;&gt; YES! GIMME MY DUCK FOR JUST $5 &lt;&lt;
                </a>

                <p className="mt-8 text-sm italic font-bold">
                    PS: If you don't buy this, your next PR will contain a critical memory leak. I guarantee it.
                </p>

            </main>
        </div>
    );
}
