import { Filters } from '../FoldersList';
import { FoldersList } from '../FoldersList/FoldersList';
import styles from './FileManager.module.scss';

export const FileManager = () => {
    return (
        <div className={styles.manager__container}>
            <Filters />
            <FoldersList />
        </div>
    );
};
