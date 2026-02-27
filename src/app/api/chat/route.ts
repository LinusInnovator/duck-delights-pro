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
    const SYSTEM_PROMPT = promptParts.length > 1 ? promptParts[1].trim() : fullPrompt;

    const result = streamText({
        model: openai('gpt-4o-mini'),
        system: SYSTEM_PROMPT,
        messages: messages,
    });

    return result.toUIMessageStreamResponse();
}
