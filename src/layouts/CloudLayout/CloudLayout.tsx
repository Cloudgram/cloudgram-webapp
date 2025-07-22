import { Header } from '@widgets/Header/Header';
import styles from './CloudLayout.module.scss';
import { Outlet } from 'react-router-dom';

export const CloudLayout = () => {
    return (
        <div className={styles.cloudLayout}>
            <Header />
            <div className={styles.cloudLayout__content}>
                <Outlet />
            </div>
        </div>
    );
};
