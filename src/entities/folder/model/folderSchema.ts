import { fileSchema } from '@/entities/file/model/fileSchema';
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

export const rootFolderSchema = z.object({
    success: z.boolean(),
    id: z.string(),
    parent_folder_id: z.string().nullable(),
    title: z.string(),
    created_at: z.date(),
    owner: z.boolean(),
    share: z.string(),
    tags: z.array(z.string()),
    color: colorSchema.nullable(),
    folders: z.array(folderSchema),
    files: z.array(fileSchema),
});

export type FolderType = z.infer<typeof folderSchema>;
export type RootFolderType = z.infer<typeof rootFolderSchema>;
