import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from '../Router/routes';

export const RouterProvider = () => {
    return (
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
    );
};
