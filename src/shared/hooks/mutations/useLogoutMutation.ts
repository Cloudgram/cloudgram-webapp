import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logoutSession } from '@shared/api/Auth';
import { AxiosError } from 'axios';
import { queryClient } from '@/shared/api/queryClient';

export const useLogoutMutation = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: () => logoutSession(),
        onSuccess() {
            localStorage.removeItem('folderHistory');
            queryClient.removeQueries({ queryKey: ['user'] });
            navigate('/auth', { replace: true });
        },
        onError(error: AxiosError) {
            if (error.response?.status === 404) {
                throw new Error('Неверный код');
            } else if (error.message.includes('CORS')) {
                console.warn('CORS-проблема, но запрос может быть успешным.');
            } else {
                throw new Error('Ошибка сервера');
            }
        },
    });
};
