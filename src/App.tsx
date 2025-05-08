import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';
import './App.css';
import { MainPage, AuthPage } from './index';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute';
import { Suspense } from 'react';
import { Load } from './components/Filters';
import { ROUTES } from './constants/routes';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
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
                        {/* Публичные роуты */}
                        <Route path={ROUTES.AUTH} element={<AuthPage />} />

                        {/* Приватные роуты */}
                        <Route element={<PrivateRoute />}>
                            <Route path={ROUTES.MY_DRIVE} element={<MainPage />} />
                            <Route path={ROUTES.FOLDER} element={<MainPage />} />
                        </Route>

                        {/* Редиректы */}
                        <Route path='/' element={<Navigate to={ROUTES.MY_DRIVE} replace />} />
                        <Route path='*' element={<Navigate to={ROUTES.MY_DRIVE} replace />} />
                    </Routes>
                </Suspense>
            </BrowserRouter>
        </QueryClientProvider>
    );
}

export default App;
