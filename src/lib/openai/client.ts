import OpenAI from 'openai';

export function createOpenAIClient() {
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
  });
}

export const DALLE_MODEL = 'dall-e-3';
