import { useLocation } from 'react-router-dom';
import { getSidebarLabelByPath, type SidebarItem } from '../lib/getSidebarLabelByPath';

export const useCurrentSectionLabel = (): SidebarItem | null => {
    const { pathname } = useLocation();
    return getSidebarLabelByPath(pathname);
};
