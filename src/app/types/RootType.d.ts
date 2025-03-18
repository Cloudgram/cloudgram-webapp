import { z } from "zod";

export const RootFolderSchema = z.object({
    success: z.boolean,
    id: z.number,
    files: z.array(z.object({

    })),
    folders: z.array(z.object({
        folder_id: z.number,
        title: z.string,
        id: z.number,
        views: z.number,
        created_at: z.date,
        owner: z.boolean,
        share: z.string,
        tags: z.array(z.string),
        color: z.object({
            id: z.number,
            title: z.string,
            hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
            background_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
            back_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
            
        })
    }))
})

export type RootFolderType = z.infer<typeof RootFolderSchema>