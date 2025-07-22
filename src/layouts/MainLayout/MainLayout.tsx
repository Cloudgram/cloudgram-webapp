import { Sidebar } from '@widgets/Sidebar/ui/Sidebar';
import styles from './MainLayout.module.scss';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
    return (
        <div className={styles.mainLayout}>
            <Sidebar />
            <div className={styles.mainLayout__content}>
                <Outlet />
            </div>
        </div>
    );
};
