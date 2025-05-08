import { Navigate, Outlet } from 'react-router-dom';
import { Load } from '../Filters';
import { useUserQuery } from '../UserPanel';

export const PrivateRoute = () => {
    const { data: user, isLoading } = useUserQuery();

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
