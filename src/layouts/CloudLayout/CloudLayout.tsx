import { HeaderWidget } from '@/widgets/Header/HeaderWidget';
import styles from './CloudLayout.module.scss';
import { Outlet } from 'react-router-dom';
import React from 'react';

export const CloudLayout = React.memo(() => {
    return (
        <div className={styles.cloudLayout}>
            <HeaderWidget />
            <div className={styles.cloudLayout__content}>
                <Outlet />
            </div>
        </div>
    );
});
