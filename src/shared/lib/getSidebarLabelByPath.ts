export type SidebarItem = {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    label: string;
    route: string;
};

import {
    sidebarMainItems,
    sidebarCategoriesItems,
    sidebarSettingsItems,
} from '../../features/sidebar/model/config';

export const getSidebarLabelByPath = (pathname: string): SidebarItem | null => {
    const items = [...sidebarMainItems, ...sidebarCategoriesItems, ...sidebarSettingsItems];
    return items.find(({ route }) => pathname === route) ?? null;
};
