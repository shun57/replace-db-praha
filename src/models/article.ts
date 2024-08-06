import { z } from 'zod';

export const ArticleSchema = z.object({
    title: z.string().nonempty("Title is required."),
    url: z.string().url("Valid URL is required."),
    description: z.string().nonempty("Description is required."),
    isRead: z.boolean()
});

export type Article = z.infer<typeof ArticleSchema>;