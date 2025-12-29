import { z } from "zod";

export const createJobDescriptionSchema = z.object({
    title: z
        .string()
        .trim()
        .optional(),
    company: z
        .string()
        .trim()
        .optional(),
    description: z
        .string("Description is required")
        .trim()
        .nonempty("Description is required"),
});