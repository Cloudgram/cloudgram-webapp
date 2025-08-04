import { Button } from '@chakra-ui/react';
import styles from './Sidebar.module.scss';
import { Link } from 'react-router-dom';
import { useActiveRoute } from '@/shared/hooks/useActiveRoute';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    route: string;
}

export const SidebarItem = ({ icon, label, route }: SidebarItemProps) => {
    const activePage = useActiveRoute(route);
    return (
        <Button
            asChild
            variant='ghost'
            className={
                activePage
                    ? `${styles.sidebar__button} ${styles.sidebar__button__active}`
                    : styles.sidebar__button
            }
        >
            <Link to={route}>
                {icon}
                {label}
            </Link>
        </Button>
    );
};
