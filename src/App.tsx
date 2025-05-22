import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import styles from './App.module.css';
import { MainPage, AuthPage } from './index';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { Suspense } from 'react';
import { Load } from './components/Filters';
import { ROUTES } from './constants/routes';
import { Provider } from 'react-redux';
import { store } from './store/store';

function App() {
    return (
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
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

                                <Route element={<PrivateRoute />}>
                                    <Route path={ROUTES.MY_DRIVE} element={<MainPage />} />
                                    <Route path={ROUTES.FOLDER} element={<MainPage />} />
                                    <Route path={ROUTES.SHARED} element={<MainPage />} />
                                    <Route path={ROUTES.FAV} element={<MainPage />} />
                                    <Route path={ROUTES.RECENT} element={<MainPage />} />
                                    <Route path={ROUTES.TRASH} element={<MainPage />} />
                                </Route>

                                <Route
                                    path='/'
                                    element={<Navigate to={ROUTES.MY_DRIVE} replace />}
                                />
                                <Route
                                    path='*'
                                    element={<Navigate to={ROUTES.MY_DRIVE} replace />}
                                />
                            </Routes>
                        </Suspense>
                    </div>
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    );
}

export default App;
