import { title } from 'process';
import { z } from 'zod';

export const RootFolderSchema = z.object({
    success: z.boolean(),
    folder_id: z.number(),
    title: z.string(),
    id: z.number(),
    views: z.number(),
    created_at: z.date(),
    owner: z.boolean(),
    share: z.string(),
    tags: z.array(z.string),
    color: z.object({
        id: z.number(),
        title: z.string(),
        hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
        background_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
        back_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
    }),
    files: z.array(
        z.object({
            id: z.number(),
            title: z.string(),
            views: z.number(),
            extension: z.string(),
            created_at: z.string(),
            preview_file_id: z.number() | null,
            owner: z.boolean(),
            share: z.string(),
            tags: z.array(z.string()),
            color: z.object({
                id: z.number(),
                title: z.string(),
                hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
                background_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
                back_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
            }),
        })
    ),
    folders: z.array(
        z.object({
            folder_id: z.number(),
            title: z.string(),
            id: z.number(),
            views: z.number(),
            created_at: z.date(),
            owner: z.boolean(),
            share: z.string(),
            tags: z.array(z.string),
            color: z.object({
                id: z.number(),
                title: z.string(),
                hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
                background_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
                back_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
            }),
        })
    ),
});

export type RootFolderType = z.infer<typeof RootFolderSchema>;
