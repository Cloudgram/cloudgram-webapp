import styles from './OfflinePage.module.scss';

export const OfflinePage = () => {
    return (
        <div className={styles.offline}>
            <h1>Нет подключения к интернету</h1>
            <p>Для работы с приложением необходимо подключение к интернету при первом входе</p>
        </div>
    );
};
