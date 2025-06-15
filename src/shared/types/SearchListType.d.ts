import { z } from 'zod';

const ColorSchema = z.object({
    id: z.string(),
    title: z.string(),
    hex: z.string(),
    back_hex: z.string(),
    background_hex: z.string(),
});

const BaseFsItemSchema = z.object({
    fs_type: z.string(),
    id: z.string(),
    title: z.string(),
    views: z.number(),
    created_at: z.string(), // or z.date() if you parse dates
    owner: z.boolean(),
    share: z.string(),
    tags: z.array(z.string()),
});

const FolderSchema = BaseFsItemSchema.extend({
    fs_type: z.literal('folder'),
    color: ColorSchema,
});

const FileSchema = BaseFsItemSchema.extend({
    fs_type: z.literal('file'),
    folder_id: z.string().nullable(),
    extension: z.string(),
    preview_file_id: z.number().nullable(),
});

export const SearchListSchema = z.object({
    success: z.boolean(),
    data: z.array(z.discriminatedUnion('fs_type', [FolderSchema, FileSchema])),
});

export type SearchListType = z.infer<typeof SearchListSchema>;
