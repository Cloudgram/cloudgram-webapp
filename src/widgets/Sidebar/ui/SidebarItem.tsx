import { Button } from '@chakra-ui/react';
import styles from './Sidebar.module.scss';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    route?: string;
}

export const SidebarItem = ({ icon, label, route }: SidebarItemProps) => {
    return (
        <Button asChild variant='ghost' className={styles.sidebar__button}>
            <a href={route}>
                {icon}
                {label}
            </a>
        </Button>
    );
};
