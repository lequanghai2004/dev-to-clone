import { z } from 'zod';

// Define the Zod schema for ImageFile
export const ImageFileSchema = z.object({
    previewUrl: z.string().url(), // Validate previewUrl as a proper URL
    file: z.instanceof(File), // Validate the file is an instance of File
});

// Infer TypeScript type from the Zod schema
export type ImageFile = z.infer<typeof ImageFileSchema>;
