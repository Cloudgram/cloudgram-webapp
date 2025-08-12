import { FolderViewerWidget } from '@/widgets/FolderViewer/FolderVIewerWidget';
import styles from './FolderPage.module.scss';

export const FolderPage = () => {
    return (
        <section className={styles.folderPage}>
            <FolderViewerWidget />
        </section>
    );
};
