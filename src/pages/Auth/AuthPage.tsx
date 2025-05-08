import {
    styles,
    useState,
    AuthCodeInput,
    ButtonLoad,
    useAuthMutation,
    AxiosError,
} from './index';

export const AuthPage = () => {
    const [code, setCode] = useState('');
    const { mutate, isPending, isError, error } = useAuthMutation();

    const handleLogin = () => {
        mutate(code);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
    };

    const errorMessage = () => {
        console.log(error);
        if (error instanceof AxiosError) {
            if (error.response?.status === 404) {
                return <span className={styles.auth__error}>Неверный код</span>;
            } else if (error.message.includes('CORS')) {
                return (
                    <span className={styles.auth__error}>
                        CORS-проблема, но запрос может быть успешным.
                    </span>
                );
            } else {
                return (
                    <span className={styles.auth__error}>Ошибка сервера</span>
                );
            }
        }
        return null; // В случае, если ошибка не экземпляр AxiosError
    };

    return (
        <div className={styles.auth}>
            <div className={styles.auth__form}>
                <h1 className={styles.auth__title}>Cloudgram</h1>
                <AuthCodeInput
                    onCodeChange={setCode}
                    onKeyDown={handleKeyDown}
                />
                <span className={styles.auth__descr}>
                    Введите код из Telegram бота
                </span>
                <div className={styles.auth__buttons}>
                    {isError && error && errorMessage()}
                    <button
                        className={`${styles.auth__button} ${styles.auth__button_login}`}
                        onClick={handleLogin}
                    >
                        {isPending ? (
                            <ButtonLoad
                                type='spinner-circle'
                                bgColor={'white'}
                                size={40}
                            />
                        ) : (
                            'Войти'
                        )}
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
