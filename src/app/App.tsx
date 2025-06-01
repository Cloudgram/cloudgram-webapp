import { Route, Routes, Navigate } from 'react-router-dom';
import styles from '@app/styles/App.module.css';
import { AuthPage } from '@pages/Auth';
import { MainPage } from '@pages/Main';
import { PrivateRoute } from '@shared/ui/PrivateRoute/ui/PrivateRoute';
import { Suspense } from 'react';
import { Load } from '@shared/ui/Loader/ui/Load';
import { ROUTES } from '@shared/config/routes/routes';
import { NotFoundPage } from '@pages/NotFound';

function App() {
    return (
        <div className={styles.container}>
            <Suspense
                fallback={
                    <Load
                        type='box-rotate-z'
                        bgColor={'black'}
                        color={'black'}
                        title={'Загрузка...'}
                        size={100}
                    />
                }
            >
                <Routes>
                    <Route path={ROUTES.AUTH} element={<AuthPage />} />
                    <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
                    <Route element={<PrivateRoute />}>
                        <Route path={ROUTES.MY_DRIVE} element={<MainPage />} />
                        <Route path={ROUTES.FOLDER} element={<MainPage />} />
                        <Route path={ROUTES.SHARED} element={<MainPage />} />
                        <Route path={ROUTES.FAV} element={<MainPage />} />
                        <Route path={ROUTES.RECENT} element={<MainPage />} />
                        <Route path={ROUTES.TRASH} element={<MainPage />} />
                    </Route>
                    <Route path='/' element={<Navigate to={ROUTES.MY_DRIVE} replace />} />
                    <Route path='*' element={<Navigate to={ROUTES.NOT_FOUND} replace />} />
                </Routes>
            </Suspense>
        </div>
    );
}

export default App;
