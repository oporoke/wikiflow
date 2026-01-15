'use server';

/**
 * @fileOverview A flow to summarize page content using AI.
 *
 * - summarizePageContent - A function that summarizes the content of a page.
 * - SummarizePageContentInput - The input type for the summarizePageContent function.
 * - SummarizePageContentOutput - The return type for the summarizePageContent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizePageContentInputSchema = z.object({
  content: z.string().describe('The content of the page to summarize.'),
});
export type SummarizePageContentInput = z.infer<
  typeof SummarizePageContentInputSchema
>;

const SummarizePageContentOutputSchema = z.object({
  summary: z.string().describe('The summary of the page content.'),
});
export type SummarizePageContentOutput = z.infer<
  typeof SummarizePageContentOutputSchema
>;

export async function summarizePageContent(
  input: SummarizePageContentInput
): Promise<SummarizePageContentOutput> {
  return summarizePageContentFlow(input);
}

const summarizePageContentPrompt = ai.definePrompt({
  name: 'summarizePageContentPrompt',
  input: {schema: SummarizePageContentInputSchema},
  output: {schema: SummarizePageContentOutputSchema},
  prompt: `Summarize the following page content:\n\n{{content}}`,
});

const summarizePageContentFlow = ai.defineFlow(
  {
    name: 'summarizePageContentFlow',
    inputSchema: SummarizePageContentInputSchema,
    outputSchema: SummarizePageContentOutputSchema,
  },
  async input => {
    const {output} = await summarizePageContentPrompt(input);
    return output!;
  }
);
