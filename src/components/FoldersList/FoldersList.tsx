import { useFoldersQuery } from '../../hooks/queries/useFolderQuery';
import { RootFolderType } from '../../types/RootType';
import { ViewType } from '../../types/view';
import { usePathfinder } from '../CreateFolder';
import { FileItem } from './FileItem';
import { FolderItem } from './FolderItem';
import { styles, useEffect, useState, useClickOutside, animateFileActionMenu } from './index';
import { ViewList } from './ViewList';

export const FoldersList = () => {
    const [foldersList, setFoldersList] = useState<RootFolderType['folders'] | null>(null);
    const [filesList, setFilesList] = useState<RootFolderType['files'] | null>(null);
    const [viewType, setViewType] = useState<ViewType>(ViewType.GRID);
    const [activeFileMenuId, setActiveFileMenuId] = useState<number | null>(null);
    const [activeFolderMenuId, setActiveFolderMenuId] = useState<number | null>(null);
    const folderId = usePathfinder() || '0';

    const closeMenu = () => {
        setActiveFileMenuId(null);
        setActiveFolderMenuId(null);
    };

    const menuRef = useClickOutside(closeMenu);
    const { data } = useFoldersQuery(folderId);

    useEffect(() => {
        if (data) {
            setFoldersList(data.folders);
            setFilesList(data.files);
        }
    }, [data]);

    useEffect(() => {
        if (menuRef.current) {
            const isMenuOpen = activeFileMenuId !== null || activeFolderMenuId !== null;
            animateFileActionMenu(menuRef, isMenuOpen);
        }
    }, [activeFileMenuId, activeFolderMenuId, menuRef]);

    return (
        <div className={styles.list__container}>
            <ViewList folderId={folderId} viewType={viewType} onViewChange={setViewType} />

            {viewType === ViewType.GRID ? (
                <ul className={styles.folders__list}>
                    {Array.isArray(foldersList) &&
                        foldersList.map((folder, index) => (
                            <FolderItem
                                folder={folder}
                                index={index}
                                actionMenuRef={menuRef}
                                key={folder.id}
                                view={viewType}
                            />
                        ))}
                    {Array.isArray(filesList) &&
                        filesList.map((file, index) => {
                            return (
                                <FileItem
                                    key={file.id}
                                    file={file}
                                    index={index}
                                    menuRef={menuRef}
                                    view={viewType}
                                />
                            );
                        })}
                </ul>
            ) : (
                <ul className={styles.folders__list_line}>
                    {Array.isArray(foldersList) &&
                        foldersList.map((folder, index) => (
                            <FolderItem
                                folder={folder}
                                index={index}
                                actionMenuRef={menuRef}
                                key={index}
                                view={viewType}
                            />
                        ))}
                    {Array.isArray(filesList) &&
                        filesList.map((file, index) => {
                            return (
                                <FileItem
                                    file={file}
                                    index={index}
                                    menuRef={menuRef}
                                    view={viewType}
                                />
                            );
                        })}
                </ul>
            )}
        </div>
    );
};
