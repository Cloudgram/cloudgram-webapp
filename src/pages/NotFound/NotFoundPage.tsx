import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';
import { Button } from '@chakra-ui/react';
import { ROUTES } from '@/app/Router/routes.config';

export const NotFoundPage = () => {
    return (
        <div className={styles.notFoundPage}>
            <h1 className={styles.notFoundPage__title}>Not Found</h1>
            <Button
                colorPalette='blue'
                className={styles.notFoundPage__button}
                asChild
                variant='ghost'
            >
                <Link to={ROUTES.PRIVATE.DASHBOARD.HOME}>Home</Link>
            </Button>
        </div>
    );
};
