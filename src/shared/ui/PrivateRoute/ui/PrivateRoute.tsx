import { Navigate, Outlet } from 'react-router-dom';
import { Load } from '@shared/ui/Loader/ui/Load';
import { useUserQuery } from '@/shared/hooks/queries/useUserQuery';
import { onlineManager } from '@tanstack/react-query';

export const PrivateRoute = () => {
    const { data: user, isLoading } = useUserQuery();
    const isOffline = !onlineManager.isOnline();

    if (isOffline && user) {
        return <Outlet />;
    }

    if (isOffline && !user) {
        return <Navigate to='/offline' replace />;
    }

    if (isLoading) {
        return (
            <Load
                type='box-rotate-z'
                bgColor={'black'}
                color={'black'}
                title={'Загрузка...'}
                size={100}
            />
        );
    }

    return user ? <Outlet /> : <Navigate to='/auth' replace />;
};
