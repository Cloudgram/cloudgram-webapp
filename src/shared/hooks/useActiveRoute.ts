import { useLocation } from 'react-router-dom';

export const useActiveRoute = (path: string): boolean => {
    const location = useLocation();
    return location.pathname.startsWith(path);
};
