'use server';
/**
 * @fileOverview An AI agent that scans for Google Drive files and categorizes them.
 */

import { ai } from '@/ai/genkit';
import { getDriveFiles, type DriveFile } from '@/lib/drive';
import { z } from 'genkit';

// Define a tool for the AI to get files from our mock service.
const getDriveFilesTool = ai.defineTool(
  {
    name: 'getDriveFiles',
    description: 'Get a list of files and folders from Google Drive.',
    inputSchema: z.object({}),
    outputSchema: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.enum(['folder', 'doc']),
        url: z.string(),
      })
    ),
  },
  async () => {
    return getDriveFiles();
  }
);

const CategorizedResourceSchema = z.object({
    title: z.string().describe('The name of the file or folder.'),
    url: z.string().describe('The URL of the resource.'),
    type: z.enum(['drive-folder', 'drive-doc', 'external-link']).describe('The type of the resource.'),
    category: z.string().describe('The suggested category for this resource (e.g., "Operations", "Marketing", "Finance").'),
});

const ScanDriveFilesOutputSchema = z.object({
  resources: z.array(CategorizedResourceSchema),
});

export type ScanDriveFilesOutput = z.infer<typeof ScanDriveFilesOutputSchema>;

export async function scanDriveFiles(): Promise<ScanDriveFilesOutput> {
  return scanDriveFilesFlow();
}

const scanDriveFilesPrompt = ai.definePrompt({
  name: 'scanDriveFilesPrompt',
  tools: [getDriveFilesTool],
  output: { schema: ScanDriveFilesOutputSchema },
  prompt: `You are an intelligent assistant that helps organize a user's workspace.
  
  Your task is to scan the user's Google Drive files and intelligently categorize them into relevant business categories like "Operations", "Marketing", "Finance", or "Product".

  1. Use the getDriveFiles tool to fetch a list of all available files.
  2. For each file, determine the most appropriate category based on its name.
  3. Format the result as a list of categorized resources. Map the Drive file type 'folder' to 'drive-folder' and 'doc' to 'drive-doc'.
  `,
});

const scanDriveFilesFlow = ai.defineFlow(
  {
    name: 'scanDriveFilesFlow',
    outputSchema: ScanDriveFilesOutputSchema,
  },
  async () => {
    const { output } = await scanDriveFilesPrompt();
    
    // In a real app, you might have more complex logic here to validate or merge results.
    // For now, we just return the categorized list from the LLM.
    if (!output) {
      return { resources: [] };
    }
    
    return output;
  }
);
