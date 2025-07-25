import { AuthForm } from '@/features/auth/ui/AuthForm';
import styles from './AuthPage.module.scss';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useCreateSessionMutation } from '@/shared/api/appApi';
import { useEffect } from 'react';
import { toaster } from '@shared/components/Toaster/toaster';
import type { ErrorResponse } from '@/features/auth/model/authTypes';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ROUTES } from '@/app/providers/Router/routes.config';

type ApiError = FetchBaseQueryError & {
    data: ErrorResponse;
};

export const AuthPage = () => {
    const [searchParams] = useSearchParams();
    const secret = searchParams.get('secret');
    const [triggerAuth, { isLoading, error, status }] = useCreateSessionMutation();
    const navigate = useNavigate();

    useEffect(() => {
        if (secret) triggerAuth({ secret: secret });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [secret]);

    useEffect(() => {
        if (status === 'fulfilled') {
            toaster.create({
                title: 'Successful authorization',
                description: 'You have successfully logged in to Cloudgram',
                type: 'success',
            });
            navigate(ROUTES.PRIVATE.DASHBOARD.HOME, { replace: true });
        }
        if (status === 'rejected' && error) {
            const errorMessage = error as ApiError;
            toaster.create({
                title: 'Authorization error',
                description: errorMessage.data.detail.msg,
                type: 'error',
                action: {
                    label: 'Retry',
                    onClick: () => triggerAuth({ secret: secret || '' }),
                },
            });
        }
    }, [status]);

    return (
        <div className={styles.authPage}>
            <AuthForm isLoading={isLoading} />
        </div>
    );
};
