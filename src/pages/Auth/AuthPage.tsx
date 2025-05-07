// import { useUserQuery } from '../../hooks/useUserQuery';
import {
    styles,
    getAuth,
    AxiosError,
    useState,
    useNavigate,
    useMutation,
    queryClient,
    AuthCodeInput,
} from './index';

export const AuthPage = () => {
    const navigate = useNavigate();
    const [code, setCode] = useState('');

    const authMutation = useMutation({
        mutationFn: () => getAuth(code),
        onSuccess() {
            queryClient.removeQueries({ queryKey: ['folders'] });
            queryClient.setQueryData(['user'], { isAuth: true });
            navigate('/folder/0', { replace: true });
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
                <h1 className={styles.auth__title}>Cloudgram</h1>
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
                        href='https://t.me/miishalom_test_bot'
                        target='_blank'
                        className={`${styles.auth__button} ${styles.auth__button_bot}`}
                    >
                        Перейти к боту
                    </a>
                </div>
            </div>
        </div>
    );
};
