import { Header } from '@widgets/Header/Header';
import styles from './CloudLayout.module.scss';
import { Outlet } from 'react-router-dom';
import React from 'react';

export const CloudLayout = React.memo(() => {
    return (
        <div className={styles.cloudLayout}>
            <Header />
            <div className={styles.cloudLayout__content}>
                <Outlet />
            </div>
        </div>
    );
});
