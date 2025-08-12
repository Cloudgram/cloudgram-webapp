import { z } from 'zod';

const hexColorSchema = z.string().regex(/^#[0-9A-Fa-f]{6}$/);

const colorSchema = z.object({
    id: z.string(),
    title: z.string(),
    hex: hexColorSchema,
    back_hex: hexColorSchema,
    background_hex: hexColorSchema,
});

export const colorResponseSchema = z.object({
    success: z.boolean(),
    data: z.array(colorSchema),
});

export type ColorType = z.infer<typeof colorSchema>;
export type ColorResponseType = z.infer<typeof colorResponseSchema>;
