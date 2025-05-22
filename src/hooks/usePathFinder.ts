import { useLocation } from 'react-router-dom';
import { rootFolderId } from '../constants/rootFolder';

export const usePathfinder = (): string => {
    const { pathname } = useLocation();
    const segments = pathname.split('/').filter(Boolean);

    if (segments[0] === 'my-drive') {
        return rootFolderId;
    }

    if (segments[0] === 'folder' && segments[1]) {
        return segments[1];
    }

    return pathname;
};
