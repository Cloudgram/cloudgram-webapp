import { Button } from '@chakra-ui/react';
import styles from './Sidebar.module.scss';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    route?: string;
}

export const SidebarItem = ({ icon, label, route }: SidebarItemProps) => {
    return (
        <Button variant='ghost' className={styles.sidebar__button}>
            {icon}
            {label}
        </Button>
    );
};
