import { z } from 'zod';

export const ColorSchema = z.object({
    data: z.array(
        z.object({
            id: z.string(),
            title: z.string(),
            hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
            back_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
            background_hex: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/),
        })
    ),
});

export type ColorType = z.infer<typeof ColorSchema>;
