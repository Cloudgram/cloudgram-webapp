import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { logoutSession } from '../../api/Auth';
import { AxiosError } from 'axios';

export const useLogoutMutation = () => {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: () => logoutSession(),
        onSuccess() {
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
