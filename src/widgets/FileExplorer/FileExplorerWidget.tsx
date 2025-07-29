import { FileExplorer } from '@features/fileExplorer/ui/FileExplorer';
import styles from './FileExplorerWidget.module.scss';
import { FileExplorerFilters } from '@/features/fileExplorer/ui/FileExplorerFilters';

export const FileExplorerWidget = () => {
    return (
        <div className={styles.fileExplorerWidget__container}>
            <div className={styles.fileExplorerWidget__header}>
                <h3 className={styles.fileExplorerWidget__title}>All Files</h3>
                <div className={styles.fileExplorerWidget__orientation}>
                    <button className={styles.fileExplorerWidget__orientation__grid}>
                        {/* <GridIcon isActive={true} /> */}
                    </button>
                </div>
            </div>
            <FileExplorerFilters />
            <FileExplorer />
        </div>
    );
};
