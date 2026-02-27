"use client";

import React, { useState, useEffect } from 'react';
import { ChartLineUp, Lightning, Users, CheckCircle, Warning } from '@phosphor-icons/react/dist/ssr';

export default function SpectatorDashboard() {
    const [trafficA, setTrafficA] = useState(0);
    const [trafficB, setTrafficB] = useState(0);
    const [revenueA, setRevenueA] = useState(0);
    const [revenueB, setRevenueB] = useState(0);
    const [confidence, setConfidence] = useState(50.0);
    const [log, setLog] = useState<string[]>([
        "[SYSTEM] Live Metric Engine Initialized...",
        "[SYSTEM] Ingesting real-time telemetry from Supabase...",
    ]);

    // Poll actual metrics from DB
    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const res = await fetch('/api/metrics');
                if (res.ok) {
                    const data = await res.json();

                    if (data.trafficA !== trafficA || data.trafficB !== trafficB) {
                        setLog(prev => ["[ROUTER] New pageview telemetry digested.", ...prev].slice(0, 8));
                    }
                    if (data.revenueA !== revenueA || data.revenueB !== revenueB) {
                        setLog(prev => ["[ANALYZER] Checkout conversion registered. Updating Bayesian matrix.", ...prev].slice(0, 8));
                    }

                    setTrafficA(data.trafficA || 0);
                    setTrafficB(data.trafficB || 0);
                    setRevenueA(data.revenueA || 0);
                    setRevenueB(data.revenueB || 0);
                    if (data.confidence) setConfidence(data.confidence);
                }
            } catch (err) {
                console.error("Failed to fetch metrics", err);
            }
        };

        // Initial fetch
        fetchMetrics();

        // Simulate engine mutation logs occasionally just for the visual stunt effect
        const logInterval = setInterval(() => {
            if (Math.random() > 0.85) {
                const events = [
                    "[MUTATOR] Page A: H1 contrast ratio below threshold. Attempting #ff0000 injection.",
                    "[ANALYZER] Page B: 'Ship faster' CTA outperforming baseline.",
                    "[ENGINE] Recalculating p-value...",
                    "[ROUTER] Target demographic skew detected. Adjusting epsilon-greedy matrix."
                ];
                const newEvent = events[Math.floor(Math.random() * events.length)];
                setLog(prev => [newEvent, ...prev].slice(0, 8));
            }
        }, 2000);

        // Poll every 3 seconds
        const pollInterval = setInterval(fetchMetrics, 3000);

        return () => {
            clearInterval(logInterval);
            clearInterval(pollInterval);
        };
    }, []);

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 font-mono p-4 md:p-8">

            {/* Header */}
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-2xl font-bold flex items-center gap-3 text-indigo-400">
                        <ChartLineUp weight="bold" className="animate-pulse" />
                        improve.delights // SPECTATOR_MODE
                    </h1>
                    <p className="text-zinc-500 text-sm mt-2">Live Telemetry: The Ugly vs. Pretty $10k Challenge</p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center gap-4 bg-zinc-900 px-4 py-2 border border-zinc-800 rounded-lg">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-xs text-zinc-400">ENGINE ACTIVE</span>
                    </div>
                    <div className="w-px h-4 bg-zinc-700 mx-2" />
                    <div className="text-xs text-zinc-400">LATENCY: 12ms</div>
                </div>
            </header>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Stats */}
                <div className="lg:col-span-2 space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Variant A (Ugly) */}
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Warning size={80} weight="fill" className="text-red-500" />
                            </div>
                            <h2 className="text-zinc-400 text-sm mb-4">VARIANT A [UGLY.HTML]</h2>
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <div className="text-xs text-zinc-500 mb-1">REVENUE</div>
                                    <div className="text-3xl font-bold text-white">${revenueA}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-zinc-500 mb-1">TRAFFIC</div>
                                    <div className="text-xl text-zinc-300">{trafficA}</div>
                                </div>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden">
                                <div className="bg-red-500 h-full w-[12%]" />
                            </div>
                        </div>

                        {/* Variant B (Pretty) */}
                        <div className="bg-zinc-900 border border-indigo-900/50 rounded-xl p-6 relative overflow-hidden ring-1 ring-indigo-500/20 shadow-[0_0_30px_rgba(79,70,229,0.05)]">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <CheckCircle size={80} weight="fill" className="text-indigo-400" />
                            </div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-zinc-400 text-sm border-b border-indigo-500/30 pb-1 text-indigo-300">VARIANT B [PRETTY.TSX]</h2>
                                <span className="text-xs bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded">WINNING</span>
                            </div>
                            <div className="flex justify-between items-end mb-4">
                                <div>
                                    <div className="text-xs text-zinc-500 mb-1">REVENUE</div>
                                    <div className="text-3xl font-bold text-white">${revenueB}</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-zinc-500 mb-1">TRAFFIC</div>
                                    <div className="text-xl text-zinc-300">{trafficB}</div>
                                </div>
                            </div>
                            {/* Progress Bar */}
                            <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden">
                                <div className="bg-indigo-500 h-full w-[88%]" />
                            </div>
                        </div>
                    </div>

                    {/* Graph Placeholder */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 h-64 flex flex-col">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-sm text-zinc-400 flex items-center gap-2">
                                <ChartLineUp /> Bayesian Win Probability Matrix
                            </h3>
                        </div>
                        <div className="flex-1 flex items-end justify-between gap-2 opacity-50 relative">
                            {/* Synthetic visual bars for aesthetic */}
                            <div className="absolute inset-0 flex items-center justify-center text-zinc-700 italic">
                                [LIVE CANVAS RENDERING ENGINE ACTIVE]
                            </div>
                            {Array.from({ length: 40 }).map((_, i) => {
                                const activityFactor = Math.random() * 60 + 20;
                                const isAWriting = trafficA > trafficB;
                                return (
                                    <div key={i} className={`w-full rounded-t-sm ${i > 20 ? (isAWriting ? 'bg-red-500/50' : 'bg-indigo-500/50') : 'bg-zinc-700'}`} style={{ height: `${activityFactor}%` }}></div>
                                )
                            })}
                        </div>
                    </div>

                </div>

                {/* Right Column: Terminal Logs */}
                <div className="bg-black border border-zinc-800 rounded-xl p-4 flex flex-col h-[500px]">
                    <div className="flex items-center gap-2 border-b border-zinc-800 pb-3 mb-3">
                        <Lightning weight="fill" className="text-yellow-500" />
                        <h3 className="text-xs text-zinc-400">ENGINE_MUTATION_LOGS</h3>
                    </div>

                    <div className="flex-1 overflow-hidden flex flex-col justify-end space-y-2 text-xs">
                        {log.slice().reverse().map((l, i) => (
                            <div
                                key={i}
                                className={`font-mono ${i === log.length - 1 ? 'text-zinc-300 animate-pulse' : 'text-zinc-600'}`}
                            >
                                <span className="text-zinc-800 mr-2">{'>'}</span> {l}
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-zinc-900 bg-zinc-950/50 p-3 rounded">
                        <div className="text-xs text-zinc-500 mb-1">AGGREGATE CONFIDENCE</div>
                        <div className="text-2xl font-bold text-emerald-400">{confidence.toFixed(2)}%</div>
                    </div>
                </div>

            </div>
        </div>
    );
}
