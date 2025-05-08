import { useMutation } from '@tanstack/react-query';
import { getAuth } from '../../api/Auth';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../../constants/routes';
import { AxiosError } from 'axios';
import { queryClient } from '../../api/queryClient';

export const useAuthMutation = () => {
    const navigate = useNavigate();

    return useMutation({
        mutationFn: (code: string) => getAuth(code),
        onSuccess() {
            queryClient.removeQueries({ queryKey: ['folders'] });
            queryClient.refetchQueries({ queryKey: ['user'] });
            navigate(ROUTES.MY_DRIVE, { replace: true });
        },
        onError: (error: AxiosError) => {
            if (error.response?.status === 404) {
                throw new Error('Неверный код');
            } else if (error.message.includes('CORS')) {
                console.warn('CORS-проблема, но запрос может быть успешным.');
                navigate(ROUTES.AUTH, { replace: true });
            } else {
                throw new Error('Ошибка сервера');
            }
        },
    });
};
