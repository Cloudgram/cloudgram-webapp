import { z } from 'zod';

const referalShema = z.object({
    id: z.string(),
    tg_id: z.number(),
    full_name: z.string(),
    username: z.string(),
    created_at: z.date(),
});

const tariffSchema = z.object({
    id: z.string(),
    title: z.string(),
    days: z.number(),
    price: z.number(),
});

const subscriberSchema = z.object({
    id: z.string(),
    end: z.date(),
    created_at: z.date(),
    tariff: tariffSchema,
});

export const userSchema = z.object({
    id: z.string(),
    tg_id: z.number(),
    created_at: z.date(),
    upload_sum: z.number(),
    referrals: z.array(referalShema).nullable(),
    username: z.string(),
    full_name: z.string(),
    speed_limit: z.number(),
    storage_limit: z.number(),
    avatar_url: z.string().nullable(),
    subscriber: subscriberSchema.nullable(),
});

export type UserType = z.infer<typeof userSchema>;
