import z from 'zod';

export const fileSchema = z.object({
    fs_type: z.literal('file'),
    id: z.string(),
    parent_folder_id: z.string().nullable(),
    title: z.string(),
    views: z.number(),
    extension: z.string(),
    created_at: z.date(),
    preview_file_id: z.string().nullable(),
    owner: z.boolean(),
    share: z.string(),
    tags: z.array(z.string()),
});

export type FileType = z.infer<typeof fileSchema>;
