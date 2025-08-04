import type { RootFolderType } from '@/entities/folder/model/folderSchema';
import styles from './FolderViewer.module.scss';
import { FolderCard } from '@/entities/folder/ui/FolderCard';
import { ViewToggle } from '@/features/viewMode/ui/ViewToggle';
import { useAppDispatch } from '@shared/hooks/useRedux';
import { setViewMode } from '@features/viewMode/model/viewModeSlice';
import type { ViewSection } from '@/features/viewMode/model/types';
import { useNavigate } from 'react-router-dom';

interface FolderListViewerProps {
    foldersArray: RootFolderType['folders'];
    viewMode: 'grid' | 'list';
    section: ViewSection;
}

export const FolderListViewer = ({ foldersArray, viewMode, section }: FolderListViewerProps) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    return (
        <div className={styles.folderViewer__folders__container}>
            <div className={styles.folderViewer__header}>
                <h3 className={styles.folderViewer__header__title}>Folders</h3>
                <ViewToggle
                    value={viewMode}
                    onChange={mode => dispatch(setViewMode({ section, mode }))}
                />
            </div>
            <div
                className={
                    viewMode === 'grid'
                        ? styles.folderViewer__folders__grid
                        : styles.folderViewer__folders__list
                }
            >
                {foldersArray.map(folder => (
                    <div
                        className={
                            viewMode === 'grid'
                                ? styles.folderViewer__item
                                : styles.folderViewer__item__list
                        }
                        key={folder.id}
                    >
                        <FolderCard
                            onDoubleClick={() => navigate(`/folder/${folder.id}`)}
                            key={folder.id}
                            folderData={folder}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
