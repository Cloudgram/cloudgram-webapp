import { rootFolderId } from '../../constants/rootFolder';
import { useAppSelectot } from '../../store/store';
import { getFilterName } from '../../utils/getFilterName';
import {
    styles,
    Link,
    useFolderHistory,
    Fragment,
    usePathfinder,
    useDragAndDrop,
    useState,
} from './index';

export const Breadcrumbs = () => {
    const folderId = usePathfinder();
    const folderPath = useFolderHistory(folderId ?? rootFolderId);
    const { handleDrop } = useDragAndDrop();
    const [dragOverId, setDragOverId] = useState<string | null>(null);
    const filterState = useAppSelectot(state => state.filter);

    const handleDragOver = (id: string) => (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragOverId(id);
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDragLeave = () => {
        setDragOverId(null);
    };

    const handleDropWrapper = (id: string) => (e: React.DragEvent<HTMLElement>) => {
        setDragOverId(null);
        handleDrop(id)(e);
    };

    const handleBreadcrumbClick = async (index: number) => {
        const newPath = folderPath.slice(0, index + 1);
        localStorage.setItem('folderHistory', JSON.stringify(newPath));
    };

    return (
        <div className={styles.breadcrumb}>
            {folderId === rootFolderId ? (
                <span
                    className={`${styles.breadcrumb__home} ${
                        dragOverId === rootFolderId ? styles.breadcrumb__dragover : ''
                    }`}
                    onDragOver={handleDragOver(rootFolderId)}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDropWrapper(rootFolderId)}
                >
                    {getFilterName(filterState)}
                </span>
            ) : (
                folderPath.map((folder, index) => (
                    <Fragment key={folder.id}>
                        {index === folderPath.length - 1 ? (
                            <span
                                className={`${styles.breadcrumb__link} ${
                                    styles.breadcrumb__link_current
                                } ${dragOverId === folder.id ? styles.breadcrumb__dragover : ''}`}
                                onDragOver={handleDragOver(folder.id)}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDropWrapper(folder.id)}
                            >
                                {folder.id === rootFolderId ? 'Home' : folder.title}
                            </span>
                        ) : (
                            <Link
                                onClick={() => handleBreadcrumbClick(index)}
                                to={`/folder/${folder.id}`}
                                className={`${styles.breadcrumb__link} ${
                                    dragOverId === folder.id ? styles.breadcrumb__dragover : ''
                                }`}
                                onDragOver={handleDragOver(folder.id)}
                                onDragLeave={handleDragLeave}
                                onDrop={handleDropWrapper(folder.id)}
                            >
                                {folder.id === rootFolderId ? 'Home' : folder.title}
                            </Link>
                        )}
                        {index < folderPath.length - 1 && (
                            <span className={styles.breadcrumb__separator}>
                                <svg
                                    width='24px'
                                    height='24px'
                                    viewBox='0 0 24 24'
                                    focusable='false'
                                    fill='currentColor'
                                >
                                    <path d='M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z'></path>
                                </svg>
                            </span>
                        )}
                    </Fragment>
                ))
            )}
        </div>
    );
};
