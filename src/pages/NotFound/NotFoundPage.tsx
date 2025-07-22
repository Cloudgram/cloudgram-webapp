import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>404</h1>
                <p className={styles.subtitle}>Страница не найдена</p>
                <p className={styles.description}>
                    Возможно, вы ошиблись адресом или страница была удалена.
                </p>
                <Link to='/' className={styles.homeLink}>
                    На главную
                </Link>
            </div>
            <div className={styles.bgAnimation}>
                <svg
                    width='300'
                    height='300'
                    viewBox='0 0 300 300'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <circle
                        cx='150'
                        cy='150'
                        r='120'
                        stroke='#A0AEC0'
                        strokeWidth='8'
                        opacity='0.2'
                    />
                    <circle
                        cx='150'
                        cy='150'
                        r='90'
                        stroke='#4299E1'
                        strokeWidth='6'
                        opacity='0.3'
                    />
                    <circle
                        cx='150'
                        cy='150'
                        r='60'
                        stroke='#38B2AC'
                        strokeWidth='4'
                        opacity='0.4'
                    />
                </svg>
            </div>
        </div>
    );
};
