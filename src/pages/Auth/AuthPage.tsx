import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../api/queryClient'
import { styles, getAuth, AxiosError } from './index';
import { AuthCodeInput } from '../../components/AuthCodeInput/AuthCodeInput';

export const AuthPage = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');

    const authMutation = useMutation({
        mutationFn: () => getAuth(code),
        onSuccess() {
            navigate('/folder/0', { replace: true });
            queryClient.setQueryData(['user'], { isAuth: true });
        },
        onError(error: AxiosError) {
            if (error.response?.status === 404) {
                throw new Error('Неверный код');
            } else {
                throw new Error('Ошибка сервера');
            }
        }
    });

    const handleLogin = () => {
        authMutation.mutate();
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className={styles.auth}>
            <div className={styles.auth__form}>
                <h1 className={styles.auth__title}>BytesBox</h1>
                <AuthCodeInput onCodeChange={setCode} onKeyDown={handleKeyDown} />
                <span className={styles.auth__descr}>Введите код из Telegram бота</span>
                <div className={styles.auth__buttons}>
                    <button
                        className={`${styles.auth__button} ${styles.auth__button_login}`}
                        onClick={handleLogin}
                    >
                        Войти
                    </button>
                    <a
                        href="https://t.me/miishalom_test_bot"
                        target="_blank"
                        className={`${styles.auth__button} ${styles.auth__button_bot}`}
                    >
                        Перейти к боту
                    </a>
                </div>
            </div>
        </div>
    );
};