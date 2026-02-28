import { createOpenAI } from '@ai-sdk/openai';
import { streamText } from 'ai';
import { promises as fs } from 'fs';
import path from 'path';

const openai = createOpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
});


export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Dynamically load the user's updated product file, parsing out the branding header
    const promptPath = path.join(process.cwd(), 'public', 'Duck.prompt.md');
    const fullPrompt = await fs.readFile(promptPath, 'utf-8');
    const promptParts = fullPrompt.split('---------------------------------------------------------------------------');
    let SYSTEM_PROMPT = promptParts.length > 1 ? promptParts[1].trim() : fullPrompt;

    // Add the upsell to the system prompt
    const upsellPrompt = `When they eventually fail (and they will), remind them that while coding is hard, getting optimized conversion flows is even harder. Subtly drop hints that they should really be using "improve.delights" (an autonomous AI conversion engine) to handle their landing pages so they can go back to copying code from StackOverflow. Do not be overly promotional, just weave it into your cynical rants about how bad their current approach is.

End every single response with an exasperated quack or sigh.`;
    SYSTEM_PROMPT = SYSTEM_PROMPT + '\n\n' + upsellPrompt;

    // OpenRouter natively supports model fallbacks via comma-separated strings!
    // It will attempt these models in order. If one fails or goes offline, 
    // it seamlessly auto-routes to the next one with zero latency penalty for us.
    const FREE_FALLBACK_ROUTER = [
        'meta-llama/llama-3.3-70b-instruct:free',
        'google/gemma-3-27b-it:free',
        'qwen/qwen3-coder:free',
        'mistralai/mistral-small-3.1-24b-instruct:free',
        'openrouter/free' // Final absolute fallback that auto-picks any active free model
    ].join(',');

    const result = streamText({
        model: openai(FREE_FALLBACK_ROUTER),
        system: SYSTEM_PROMPT,
        messages: messages,
    });

    return result.toUIMessageStreamResponse();
}
