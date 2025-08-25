import { sidebarCategoriesItems, sidebarMainItems, sidebarSettingsItems } from '../model/config';
import styles from './Sidebar.module.scss';
import { Box, Stack } from '@chakra-ui/react';
import { SidebarItem } from './SidebarItem';
import { SidebarSection } from './SidebarSection';

export const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <nav className={styles.sidebar__nav}>
                <Box className={styles.sidebar__upper}>
                    <Stack as={'ul'} className={styles.sidebar__upper__list}>
                        {sidebarMainItems.map(item => (
                            <SidebarItem
                                key={item.label}
                                label={item.label}
                                route={item.route}
                                icon={item.icon()}
                            />
                        ))}
                    </Stack>
                    <Stack as={'ul'}>
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
                </Box>
                <Box className={styles.sidebar__lower}>
                    <Stack as={'ul'} className={styles.sidebar__lower__list}>
                        {sidebarSettingsItems.map(item => (
                            <SidebarItem
                                key={item.label}
                                label={item.label}
                                route={item.route}
                                icon={item.icon()}
                            />
                        ))}
                    </Stack>
                </Box>
            </nav>
        </aside>
    );
};
