
import { z } from "zod";

export const uploadResumeSchema = z.object({
    fileUrl: z
    .string("File URL required")
    .trim()
    .nonempty("File URL is required")
    .url(),
    text: z
    .string()
    .trim()
    .optional(),
});