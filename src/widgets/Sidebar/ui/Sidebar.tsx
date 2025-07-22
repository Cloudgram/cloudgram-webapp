import { sidebarCategoriesItems, sidebarMainItems, sidebarSettingsItems } from '../model/config';
import styles from './Sidebar.module.scss';
import { Stack } from '@chakra-ui/react';
import { SidebarItem } from './SidebarItem';
import { SidebarSection } from './SidebarSection';

export const Sidebar = () => {
    return (
        <div className={styles.sidebar}>
            <div className={styles.sidebar__upper}>
                <Stack gap={1}>
                    {sidebarMainItems.map(item => (
                        <SidebarItem
                            key={item.label}
                            label={item.label}
                            route={item.route}
                            icon={item.icon()}
                        />
                    ))}
                </Stack>
                {/* <Stack>
                    <SidebarSection title='Workspaces'>
                        {sidebarCategoriesItems.map(item => (
                            <SidebarItem
                                key={item.label}
                                label={item.label}
                                route={item.route}
                                icon={item.icon()}
                            />
                        ))}
                    </SidebarSection>
                </Stack> */}
                <Stack>
                    <SidebarSection title='Categories'>
                        {sidebarCategoriesItems.map(item => (
                            <SidebarItem
                                key={item.label}
                                label={item.label}
                                route={item.route}
                                icon={item.icon()}
                            />
                        ))}
                    </SidebarSection>
                </Stack>
            </div>
            <div className={styles.sidebar__lower}>
                <Stack gap={1}>
                    {sidebarSettingsItems.map(item => (
                        <SidebarItem
                            key={item.label}
                            label={item.label}
                            route={item.route}
                            icon={item.icon()}
                        />
                    ))}
                </Stack>
            </div>
        </div>
    );
};
