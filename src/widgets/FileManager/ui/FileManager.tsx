import { Sidebar } from '@widgets/Sidebar';
import { FoldersList } from '@widgets/FoldersList/ui/FoldersList';
import styles from './FileManager.module.scss';

export const FileManager = () => {
    return (
        <div className={styles.manager__container}>
            <Sidebar />
            <FoldersList />
        </div>
    );
};
