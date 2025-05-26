import { z } from 'zod';

export const UserSchema = z.object({
    id: z.number(),
    tg_id: z.number(),
    created_at: z.date(),
    uploaded_sum: z.number(),
    referrals: z.array(
        z.object({
            id: z.number(),
            tg_id: z.number(),
            full_name: z.string(),
            username: z.string(),
            created_at: z.string(),
        })
    ),
    avatar: z.string(),
    username: z.string(),
    full_name: z.string(),
    speed_limit: z.number(),
    storage_limit: z.number(),
    subscriber: z.object({
        id: z.number(),
        end: z.string(),
        created_at: z.date(),
        tariff:
            z.object({
                id: z.number(),
                title: z.string(),
                days: z.number(),
                price: z.number(),
            }) | null,
    }),
});

export type UserType = z.infer<typeof UserSchema>;
