import { ListAnimation } from '../../utils/animations/ListAnimation';
import { useHotkeys } from '../../hooks/hotkeys/useHotkeys';
import {
    styles,
    useEffect,
    useState,
    usePathfinder,
    ViewType,
    useFoldersQuery,
    FolderItem,
    FileItem,
    RootFolderType,
    ViewList,
    useDragAndDrop,
    CreateFolderModal,
} from './index';
import { useAppSelectot } from '../../store/store';
import { FILTERS } from '../../constants/filters';
import { useTrashList } from '../../hooks/queries/useTrashList';

export const FoldersList = () => {
    const [foldersList, setFoldersList] = useState<RootFolderType['folders'] | null>(null);
    const [filesList, setFilesList] = useState<RootFolderType['files'] | null>(null);
    const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);
    const [createModal, setCreateModal] = useState(false);

    const folderId = usePathfinder();
    const { data } = useFoldersQuery(folderId);
    const { data: trashData } = useTrashList();

    const currentFilter = useAppSelectot(state => state.filter);

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
            {createModal && <CreateFolderModal onClose={() => setCreateModal(false)} />}
        </div>
    );
};
