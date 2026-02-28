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

    const result = streamText({
        model: openai('meta-llama/llama-3.3-70b-instruct:free'),
        system: SYSTEM_PROMPT,
        messages: messages,
    });

    return result.toUIMessageStreamResponse();
}
