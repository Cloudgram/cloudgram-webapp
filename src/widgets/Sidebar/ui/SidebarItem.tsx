import { Button } from '@chakra-ui/react';
import styles from './Sidebar.module.scss';
import { useNavigate } from 'react-router-dom';

interface SidebarItemProps {
    icon: React.ReactNode;
    label: string;
    route?: string;
}

export const SidebarItem = ({ icon, label, route }: SidebarItemProps) => {
    const navigate = useNavigate();

    const handleRoute = (route: string | undefined) => {
        if (route) {
            navigate(route);
        }
    };

    return (
        <Button
            onClick={() => handleRoute(route)}
            variant='ghost'
            className={styles.sidebar__button}
        >
            {icon}
            {label}
        </Button>
    );
};
