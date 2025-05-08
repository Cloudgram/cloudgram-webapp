import { useLocation } from 'react-router-dom';

export const usePathfinder = (): string => {
    const { pathname } = useLocation();
    const segments = pathname.split('/').filter(Boolean);

    if (segments[0] === 'my-drive') {
        return '0';
    }

    if (segments[0] === 'folder' && segments[1]) {
        return segments[1];
    }

    return pathname;
};
