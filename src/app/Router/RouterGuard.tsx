import type { AuthError } from '@/features/auth/model/auth.types';
import { useGetUserQuery } from '@shared/api/appApi';
import { toaster } from '@shared/components/Toaster/toaster';
import { Box, Spinner } from '@chakra-ui/react';
import { Navigate, Outlet } from 'react-router-dom';
import { ROUTES } from './routes.config';

export const RouterGuard = () => {
    const { data: user, isLoading, status, error } = useGetUserQuery();

    if (isLoading) {
        return (
            <Box w='100vw' h='100vh' display='flex' justifyContent='center' alignItems='center'>
                <Spinner color='teal.500' size='xl' />
            </Box>
        );
    }

    if (status === 'rejected') {
        const errorMessage = error as AuthError;
        toaster.create({
            title: 'User is not logged in',
            description: errorMessage.data.detail.msg,
            type: 'error',
        });
        return <Navigate to={ROUTES.PUBLIC.AUTH} replace />;
    }

    return user ? <Outlet /> : <Navigate to={ROUTES.PUBLIC.AUTH} replace />;
};
