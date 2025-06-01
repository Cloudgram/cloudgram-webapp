import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5 * 60 * 1000, // данные считаются свежими 5 минут
            gcTime: 7 * 24 * 60 * 1000, // данные будут храниться в кеше 7 дней
            retry: 2, // количество повторных попыток при ошибке
            refetchOnWindowFocus: false, // отключить автоматическое обновление при фокусе окна
        },
    },
});
