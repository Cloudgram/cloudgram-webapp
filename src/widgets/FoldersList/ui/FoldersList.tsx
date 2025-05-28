import { useAppSelectot } from '@app/store/config/store';
import { FILTERS } from '@/shared/config/routes/filters';
import { ViewType } from '@/shared/config/routes/view';
import { useHotkeys } from '@/shared/hooks/hotkeys/useHotkeys';
import { useFoldersQuery } from '@/shared/hooks/queries/useFolderQuery';
import { useTrashList } from '@/shared/hooks/queries/useTrashList';
import { useDragAndDrop } from '@/shared/hooks/state/useDragAndDrop';
import { usePathfinder } from '@/shared/hooks/usePathFinder';
import { RootFolderType } from '@shared/types';
import { ListAnimation } from '@shared/lib/animations';
import { useEffect, useState } from 'react';
import { ViewList } from './ViewList';
import { FolderItem } from './FolderItem';
import { FileItem } from './FileItem';
import { FolderFormModal } from '@features/folderManagement';
import styles from './FoldersList.module.scss';

export const FoldersList = () => {
    const [foldersList, setFoldersList] = useState<RootFolderType['folders'] | null>(null);
    const [filesList, setFilesList] = useState<RootFolderType['files'] | null>(null);
    const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);
    const [createModal, setCreateModal] = useState(false);

    const currentFilter = useAppSelectot(state => state.filter);
    const folderId = usePathfinder();
    const { data } = useFoldersQuery(folderId);
    const { data: trashData } = useTrashList(currentFilter === FILTERS.TRASH);

    useHotkeys('x', () => {
        setCreateModal(true);
    });

    const { isDragging, handleDragStart, handleDragEnd, handleDragOver, handleDrop } =
        useDragAndDrop();

    const listRef = ListAnimation([data, viewType]);

    useEffect(() => {
        if (data) {
            switch (currentFilter) {
                case FILTERS.TRASH:
                    if (trashData) {
                        setFoldersList(trashData?.folders);
                        setFilesList(trashData?.files);
                    }
                    break;
                // case FILTERS.SHARED:
                //     if (data.share === 'public') {
                //         setFoldersList(data.folders.filter(folder => folder.share === 'public'));
                //         setFilesList(data.files.filter(file => file.share === 'public'));
                //     }
                //     break;
                default:
                    setFoldersList(data.folders);
                    setFilesList(data.files);
            }
        } else {
            setFoldersList(null);
            setFilesList(null);
        }
    }, [data, currentFilter, trashData]);

    return (
        <div className={styles.list__container} onDragOver={handleDragOver}>
            <ViewList viewType={viewType} onViewChange={setViewType} />
            <div ref={listRef}>
                {viewType === ViewType.GRID ? (
                    <ul className={styles.folders__list}>
                        {Array.isArray(foldersList) &&
                            foldersList.map((folder, index) => (
                                <FolderItem
                                    folder={folder}
                                    index={index}
                                    key={folder.id}
                                    view={viewType}
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    onDrop={handleDrop}
                                    isDragging={isDragging}
                                />
                            ))}
                        {Array.isArray(filesList) &&
                            filesList.map((file, index) => {
                                return (
                                    <FileItem
                                        key={file.id}
                                        file={file}
                                        index={index}
                                        view={viewType}
                                    />
                                );
                            })}
                    </ul>
                ) : (
                    <ul className={styles.folders__list_line} onDragOver={handleDragOver}>
                        {Array.isArray(foldersList) &&
                            foldersList.map((folder, index) => (
                                <FolderItem
                                    folder={folder}
                                    index={index}
                                    key={folder.id}
                                    view={viewType}
                                    onDragStart={handleDragStart}
                                    onDragEnd={handleDragEnd}
                                    onDrop={handleDrop}
                                    isDragging={isDragging}
                                />
                            ))}
                        {Array.isArray(filesList) &&
                            filesList.map((file, index) => {
                                return (
                                    <FileItem
                                        file={file}
                                        index={index}
                                        key={file.id}
                                        view={viewType}
                                    />
                                );
                            })}
                    </ul>
                )}
            </div>
            {createModal && <FolderFormModal mode='create' onClose={() => setCreateModal(false)} />}
        </div>
    );
};
