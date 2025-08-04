import { Sidebar } from '@widgets/Sidebar/ui/Sidebar';
import styles from './MainLayout.module.scss';
import { Outlet } from 'react-router-dom';
import React from 'react';

export const MainLayout = React.memo(() => {
    return (
        <div className={styles.mainLayout}>
            <Sidebar />
            <div className={styles.mainLayout__content}>
                <Outlet />
            </div>
        </div>
    );
});
