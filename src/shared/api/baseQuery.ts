import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://api.cloudgram-dev.ru',
    credentials: 'include',
    headers: {
        'Content-Type': 'application/json',
    },
});
