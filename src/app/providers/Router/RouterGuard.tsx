import { Navigate, Outlet } from 'react-router-dom';

export const RouterGuard = () => {
    // const { data: user, isLoading } = useUserQuery();
    const user = true;

    // if (isOffline && user) {
    //     return <Outlet />;
    // }

    // if (isOffline && !user) {
    //     return <Navigate to='/offline' replace />;
    // }

    // if (isLoading) {
    //     return (
    //         <Load
    //             type='box-rotate-z'
    //             bgColor={'black'}
    //             color={'black'}
    //             title={'Загрузка...'}
    //             size={100}
    //         />
    //     );
    // }

    return user ? <Outlet /> : <Navigate to='/auth' replace />;
};
