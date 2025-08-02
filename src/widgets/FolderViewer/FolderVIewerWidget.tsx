import { FolderViewer } from '@/features/folderViewer/ui/FolderViewer';
import styles from './FolderVIewerWidget.module.scss';

export const FolderViewerWidget = () => {
    return (
        <div className={styles.folderViewerWidget}>
            <FolderViewer />
        </div>
    );
};
