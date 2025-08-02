import { FolderViewerWidget } from '@/widgets/FolderViewer/FolderVIewerWidget';
import styles from './FolderPage.module.scss';

export const FolderPage = () => {
    return (
        <div className={styles.folderPage}>
            <FolderViewerWidget />
        </div>
    );
};
