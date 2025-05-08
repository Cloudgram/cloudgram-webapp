import { FoldersList, Header, styles, useParams, Navigate } from './index';

export const MainPage = () => {
    const { folderId } = useParams();

    if (folderId === '0') {
        return <Navigate to={'/my-drive'} replace />;
    }

    return (
        <section className={styles.main}>
            <Header />
            <FoldersList />
        </section>
    );
};
