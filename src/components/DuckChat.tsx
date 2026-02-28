// @ts-nocheck
"use client";
// @ts-nocheck

import React, { useRef, useEffect, useState } from 'react';
import { useChat } from '@ai-sdk/react';
import { Warning, Terminal } from '@phosphor-icons/react/dist/ssr';

interface DuckChatProps {
    styleContext?: 'ugly' | 'pretty';
    unlimited?: boolean;
}

export default function DuckChat({ styleContext = 'pretty', unlimited = false }: DuckChatProps) {
    const [input, setInput] = useState('');
    const { messages, status, sendMessage, error } = useChat({
        api: '/api/chat',
        onError: (err) => {
            console.error("USECHAT FATAL ERROR:", err);
            window.lastUseChatError = err;
        },
    });

    const isLoading = status === 'streaming' || status === 'submitted';

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        sendMessage({ content: input, role: 'user' });
        setInput('');
    };

    const getMessageText = (m: any) => {
        if (typeof m.content === 'string' && m.content) return m.content;
        if (m.text) return m.text;
        if (m.parts && m.parts.length > 0) {
            return m.parts.map((p: any) => p.text || '').join('');
        }
        return '...';
    };

    const endOfMessagesRef = useRef<HTMLDivElement>(null);

    // Scroll to bottom on new message
    useEffect(() => {
        endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Check limit (only count user messages)
    const userMessageCount = messages.filter((m: any) => m.role === 'user').length;
    const isGated = !unlimited && userMessageCount >= 3;

    if (styleContext === 'ugly') {
        return (
            <div className="w-full max-w-2xl mx-auto my-12 border-[6px] border-[#000080] bg-[#c0c0c0] p-1 font-[Courier] shadow-[8px_8px_0_#000]">

                {/* Win95 Header Bar */}
                <div className="bg-[#000080] text-white p-1 text-left font-bold flex justify-between items-center text-sm">
                    <span>🦆 DUCK_DEBUG.EXE</span>
                    <div className="flex gap-1">
                        <button className="bg-[#c0c0c0] text-black w-4 h-4 text-xs font-black shadow-[-1px_-1px_0_#fff_inset,1px_1px_0_#000] active:shadow-[-1px_-1px_0_#000_inset,1px_1px_0_#fff]">_</button>
                        <button className="bg-[#c0c0c0] text-black w-4 h-4 text-xs font-black shadow-[-1px_-1px_0_#fff_inset,1px_1px_0_#000] active:shadow-[-1px_-1px_0_#000_inset,1px_1px_0_#fff]">□</button>
                        <button className="bg-[#c0c0c0] text-black w-4 h-4 text-xs font-black shadow-[-1px_-1px_0_#fff_inset,1px_1px_0_#000] active:shadow-[-1px_-1px_0_#000_inset,1px_1px_0_#fff]">X</button>
                    </div>
                </div>

                {/* Chat Area */}
                <div className="bg-white border-2 border-l-[#808080] border-t-[#808080] border-r-white border-b-white h-[400px] overflow-y-auto p-4 mb-2 text-left text-[#000080] whitespace-pre-wrap">
                    <div className="mb-4">
                        <strong>[SYSTEM_DUCK.BAT]:</strong> *Sigh*. What broke now? Paste your terrible code below so I can fix it for you. (Limits: 3 queries).
                    </div>

                    {messages.map((m: any) => (
                        <div key={m.id} className="mb-4 leading-tight">
                            <strong className={m.role === 'user' ? 'text-black' : 'text-red-700'}>
                                {m.role === 'user' ? 'YOU:' : '[DUCK_RESPONSE]:'}
                            </strong>
                            {' '}{getMessageText(m)}
                        </div>
                    ))}
                    {isLoading && <div className="animate-pulse">LOADING_GENIUS_REPLY.DLL...</div>}
                    <div ref={endOfMessagesRef} />
                </div>

                {/* Input Area */}
                {isGated ? (
                    <div className="bg-red-600 text-yellow-300 font-black p-4 text-center border-4 border-black">
                        <Warning className="w-8 h-8 mx-auto mb-2 animate-bounce" />
                        QUACK! DEMO LIMIT REACHED. BUY THE DUCK TO CONTINUE.
                        <a href="https://sell.delights.pro/checkout" className="block mt-2 bg-yellow-300 text-red-600 border-2 border-black p-2 hover:bg-black hover:text-white">
                            =&gt; CLICK HERE TO BUY LICENSE NOW &lt;=
                        </a>
                    </div>
                ) : (
                    <form className="flex gap-2" onSubmit={handleSubmit}>
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste your pathetic error here..."
                            className="flex-1 bg-white border-2 border-l-[#808080] border-t-[#808080] border-r-white border-b-white px-2 py-1 text-sm outline-none"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input}
                            className="bg-[#c0c0c0] text-black px-4 py-1 text-sm font-bold shadow-[-2px_-2px_0_#fff_inset,2px_2px_0_#000] active:shadow-[-2px_-2px_0_#000_inset,2px_2px_0_#fff]"
                        >
                            SEND
                        </button>
                    </form>
                )}
            </div>
        );
    }

    // PRETTY THEME
    return (
        <div className="w-full max-w-3xl mx-auto my-16 bg-zinc-950/80 backdrop-blur-xl border border-zinc-800/80 rounded-2xl shadow-2xl overflow-hidden ring-1 ring-white/5 font-sans">

            {/* Header */}
            <div className="bg-zinc-900/50 border-b border-zinc-800 px-6 py-4 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-indigo-400">
                    <Terminal weight="duotone" />
                </div>
                <div className="text-left">
                    <h3 className="text-sm font-semibold text-zinc-200">AI Duck Debugger</h3>
                    <p className="text-xs text-zinc-500">Live Demo ({3 - userMessageCount} requests remaining)</p>
                </div>
                <div className="ml-auto flex gap-2">
                    <span className="w-3 h-3 rounded-full bg-zinc-800" />
                    <span className="w-3 h-3 rounded-full bg-zinc-800" />
                    <span className="w-3 h-3 rounded-full bg-zinc-800" />
                </div>
            </div>

            {/* Chat Area */}
            <div className="h-[400px] overflow-y-auto px-6 py-4 space-y-6 text-left">
                <div className="flex gap-4">
                    <div className="w-8 h-8 rounded shrink-0 bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono text-sm overflow-hidden border border-indigo-500/30 shadow-[0_0_10px_rgba(99,102,241,0.2)]">
                        <img src="/ducky.png" alt="Duck" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-zinc-300 text-sm leading-relaxed max-w-xl bg-zinc-900/40 p-4 rounded-xl rounded-tl-sm border border-zinc-800/50">
                        *Sigh*. I was trained on billions of parameters to arrive here. Paste your syntax error so I can fix it.
                    </div>
                </div>

                {messages.map((m: any) => (
                    <div key={m.id} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center font-mono text-sm overflow-hidden ${m.role === 'user' ? 'bg-zinc-800 text-zinc-400' : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                            }`}>
                            {m.role === 'user' ? '👤' : <img src="/ducky.png" alt="Duck" className="w-full h-full object-cover" />}
                        </div>
                        <div className={`text-sm leading-relaxed max-w-2xl p-4 rounded-xl border ${m.role === 'user'
                            ? 'bg-zinc-800/40 border-zinc-700/50 text-zinc-200 rounded-tr-sm'
                            : 'bg-zinc-900/40 border-zinc-800/50 text-zinc-300 rounded-tl-sm prose prose-invert prose-p:leading-relaxed prose-pre:bg-zinc-950 prose-pre:border prose-pre:border-zinc-800'
                            }`}>
                            {/* Basic markdown parsing block for line breaks if needed */}
                            <span className="whitespace-pre-wrap">{getMessageText(m)}</span>
                        </div>
                    </div>
                ))}

                {error && (
                    <div className="text-red-500 bg-red-500/10 p-4 rounded-xl border border-red-500/50 text-sm">
                        Error: {error.message}
                    </div>
                )}
                {isLoading && (
                    <div className="flex gap-4">
                        <div className="w-8 h-8 rounded shrink-0 bg-indigo-500/20 flex items-center justify-center">
                            <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-ping" />
                        </div>
                    </div>
                )}
                <div ref={endOfMessagesRef} />
            </div>

            {/* Input Area */}
            {isGated ? (
                <div className="p-6 bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-t border-indigo-500/30 text-center relative overflow-hidden">
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-indigo-400 to-transparent opacity-50" />
                    <h4 className="text-lg font-bold text-white mb-2">Evaluation Complete.</h4>
                    <p className="text-indigo-200 text-sm mb-6 max-w-md mx-auto">
                        You've experienced 3 live debugger interactions. To unlock the unlimited <code>Duck.prompt</code> license for your IDE, initialize checkout.
                    </p>
                    <a
                        href="https://sell.delights.pro/checkout"
                        className="inline-flex items-center justify-center bg-indigo-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-400 transition-colors shadow-[0_0_20px_rgba(99,102,241,0.4)]"
                    >
                        Unlock Full License ($5)
                    </a>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="p-4 bg-zinc-900/80 border-t border-zinc-800">
                    <div className="relative flex items-center">
                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={isLoading}
                            placeholder="Paste code or ask a question..."
                            className="w-full bg-zinc-950 border border-zinc-800 hover:border-zinc-700 focus:border-indigo-500 rounded-xl px-4 py-3 text-sm text-zinc-200 outline-none transition-colors"
                        />
                        <button
                            type="submit"
                            disabled={isLoading || !input}
                            className="absolute right-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-medium transition-colors disabled:opacity-50"
                        >
                            Send
                        </button>
                    </div>
                </form>
            )}

        </div>
    );
}
