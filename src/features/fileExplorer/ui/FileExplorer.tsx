import { FolderCard } from '@/entities/folder/ui/FolderCard';
import styles from './FileExplorer.module.scss';
import { useGetFolderQuery } from '@/shared/api/appApi';

interface FileExplorerProps {
    viewMode?: 'grid' | 'list';
}

export const FileExplorer = ({ viewMode }: FileExplorerProps) => {
    const { data: folderData } = useGetFolderQuery({ folderID: 'root' });

    return (
        <div
            className={viewMode === 'grid' ? styles.fileExplorer__grid : styles.fileExplorer__list}
        >
            {Array.isArray(folderData?.folders) &&
                folderData.folders.map(folder => (
                    <div
                        className={
                            viewMode === 'grid'
                                ? styles.fileExplorer__item
                                : styles.fileExplorer__item__list
                        }
                        key={folder.id}
                    >
                        <FolderCard key={folder.id} folderData={folder} />
                    </div>
                ))}
        </div>
    );
};
