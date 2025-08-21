import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQuery = fetchBaseQuery({
    baseUrl:
        import.meta.env.MODE === 'production'
            ? import.meta.env.VITE_API_URL_PROD
            : import.meta.env.VITE_API_URL_DEV,
    credentials: 'include',
    // headers: {
    //     'Content-Type': 'application/json',
    // },
});
