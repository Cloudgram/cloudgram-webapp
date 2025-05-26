import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.scss';

export const NotFoundPage = () => {
    return (
        <div className={styles.notFound}>
            <div className={styles.content}>
                <div className={styles.number}>404</div>
                <h1 className={styles.title}>Страница не найдена</h1>
                <p className={styles.description}>
                    Возможно, она была удалена или перемещена на другой адрес
                </p>
                <Link to='/my-drive' className={styles.button}>
                    Вернуться на главную
                </Link>
            </div>
            <div className={styles.glitchWrap}>
                <div className={styles.glitch}></div>
            </div>
        </div>
    );
};
