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
} from './index';

export const FoldersList = () => {
    const [foldersList, setFoldersList] = useState<RootFolderType['folders'] | null>(null);
    const [filesList, setFilesList] = useState<RootFolderType['files'] | null>(null);
    const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);

    const folderId = usePathfinder() || '0';
    const { data } = useFoldersQuery(folderId);

    const { isDragging, handleDragStart, handleDragEnd, handleDragOver, handleDrop } =
        useDragAndDrop();

    useEffect(() => {
        if (data) {
            setFoldersList(data.folders);
            setFilesList(data.files);
        }
    }, [data]);

    return (
        <div className={styles.list__container} onDragOver={handleDragOver}>
            <ViewList folderId={folderId} viewType={viewType} onViewChange={setViewType} />

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
                                <FileItem key={file.id} file={file} index={index} view={viewType} />
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
                                <FileItem file={file} index={index} key={file.id} view={viewType} />
                            );
                        })}
                </ul>
            )}
        </div>
    );
};
