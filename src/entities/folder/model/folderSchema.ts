import z from 'zod';

const colorSchema = z.object({
    id: z.string(),
    title: z.string(),
    hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
    back_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
    background_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
});

const folderSchema = z.object({
    fs_type: z.literal('folder'),
    title: z.string(),
    id: z.string(),
    views: z.number(),
    created_at: z.date(),
    owner: z.boolean(),
    share: z.string(),
    tags: z.array(z.string()),
    color: colorSchema.nullable(),
});

const fileSchema = z.object({
    fs_type: z.literal('file'),
    id: z.string(),
    title: z.string(),
    views: z.number(),
    extension: z.string(),
    created_at: z.string(),
    preview_file_id: z.number().nullable(),
    owner: z.boolean(),
    share: z.string(),
    tags: z.array(z.string()),
});

export const rootFolderSchema = z.object({
    success: z.boolean(),
    id: z.string(),
    folder_id: z.string().nullable(),
    title: z.string(),
    created_at: z.date(),
    owner: z.boolean(),
    share: z.string(),
    tags: z.array(z.string()),
    color: colorSchema.nullable(),
    folders: z.array(folderSchema),
    files: z.array(fileSchema),
});

export type RootFolderType = z.infer<typeof rootFolderSchema>;
