import { useAuthMutation } from '@/shared/hooks/mutations/useAuthMutation';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styles from './AuthPage.module.scss';
import { ButtonLoad } from '@shared/ui/Loader/ui/ButtonLoad';
import { prodBotUrl } from '@/shared/config/app/cloudgramBotUrl';
import { useUserQuery } from '@shared/hooks';

export const AuthPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { mutate, isPending, isError, error } = useAuthMutation();
    const { data: user, isSuccess: isUserSuccess } = useUserQuery();
    const userSecret = searchParams.get('secret') || '';

    useEffect(() => {
        if (userSecret) {
            mutate(userSecret);
        }
    }, [userSecret, mutate]);

    useEffect(() => {
        if (isUserSuccess && user) {
            navigate('/my-drive', { replace: true });
        }
    }, [isUserSuccess, user, navigate]);

    const errorMessage = () => {
        if (error instanceof AxiosError) {
            switch (error.response?.status) {
                case 400:
                    return (
                        <span className={styles.auth__error}>
                            Недействительная ссылка авторизации
                        </span>
                    );

                case 404:
                    return <span className={styles.auth__error}>Неверный токен</span>;

                case 401:
                    return <span className={styles.auth__error}>Ошибка авторизации</span>;

                case 500:
                    return <span className={styles.auth__error}>Ошибка сервера</span>;

                default:
                    if (error.message?.includes('CORS')) {
                        return (
                            <span className={styles.auth__error}>
                                CORS-проблема, но запрос может быть успешным.
                            </span>
                        );
                    }
                    return <span className={styles.auth__error}>Неизвестная ошибка</span>;
            }
        }
        return null;
    };

    return (
        <div className={styles.auth}>
            <div className={styles.auth__form}>
                <h1 className={styles.auth__title}>Cloudgram</h1>
                <span className={styles.auth__descr}>
                    {isPending ? (
                        <ButtonLoad
                            type='bubble-loop'
                            size={50}
                            bgColor={'black'}
                            color={'black'}
                            title='Выполняется вход...'
                        />
                    ) : (
                        'Авторизация через Telegram'
                    )}
                </span>
                <div className={styles.auth__buttons}>
                    {isError && error && errorMessage()}
                    {!userSecret && (
                        <a
                            href={prodBotUrl}
                            target='_blank'
                            className={`${styles.auth__button} ${styles.auth__button_bot}`}
                        >
                            Перейти к боту
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
