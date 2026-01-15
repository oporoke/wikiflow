'use server';

/**
 * @fileOverview An AI agent for generating page titles based on content.
 *
 * - generatePageTitle - A function that generates a page title from content.
 * - GeneratePageTitleInput - The input type for the generatePageTitle function.
 * - GeneratePageTitleOutput - The return type for the generatePageTitle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GeneratePageTitleInputSchema = z.object({
  content: z
    .string()
    .describe('The content of the page to generate a title for.'),
});
export type GeneratePageTitleInput = z.infer<typeof GeneratePageTitleInputSchema>;

const GeneratePageTitleOutputSchema = z.object({
  title: z.string().describe('The generated title for the page.'),
});
export type GeneratePageTitleOutput = z.infer<typeof GeneratePageTitleOutputSchema>;

export async function generatePageTitle(input: GeneratePageTitleInput): Promise<GeneratePageTitleOutput> {
  return generatePageTitleFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generatePageTitlePrompt',
  input: {schema: GeneratePageTitleInputSchema},
  output: {schema: GeneratePageTitleOutputSchema},
  prompt: `You are an expert at generating concise and relevant titles for web pages.

  Based on the content below, generate a title for the page. The title should be no more than 10 words.

  Content: {{{content}}}`,
});

const generatePageTitleFlow = ai.defineFlow(
  {
    name: 'generatePageTitleFlow',
    inputSchema: GeneratePageTitleInputSchema,
    outputSchema: GeneratePageTitleOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
