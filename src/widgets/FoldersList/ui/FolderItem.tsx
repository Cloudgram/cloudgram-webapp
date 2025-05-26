import styles from './FoldersList.module.scss';
import { deleteFolder, getFolders } from '@shared/api/Folders';
import { queryClient } from '@shared/api/queryClient';
import { copyEntity, eleminateEntity, repairEntity } from '@shared/api/shared';
import { useAppSelectot } from '@app/store/config/store';
import { ActionMenu } from '@/shared/ui/ActionMenu/ui/ActionMenu';
import { FolderFormModal } from '@features/folderManagement';
import { FILTERS } from '@/shared/config/routes/filters';
import { rootFolderId } from '@/shared/config/app/rootFolder';
import { ViewType } from '@/shared/config/routes/view';
import { useClickOutside } from '@/shared/hooks/state/useClickOutside';
import { usePathfinder } from '@/shared/hooks/usePathFinder';
import { RootFolderType } from '@shared/types';
import { dateFormat } from '@/shared/lib/utils/date/formatDate';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FolderItemProps {
    folder: RootFolderType['folders'][number];
    index: number;
    view: ViewType;
    onDragStart: (folder: {
        id: string;
        title: string;
        color_id: string;
    }) => (e: React.DragEvent<HTMLElement>) => void;
    onDragEnd: () => void;
    onDrop: (targetId: string) => (e: React.DragEvent<HTMLElement>) => Promise<void>;
    isDragging: boolean;
}

export const FolderItem: React.FC<FolderItemProps> = ({
    folder,
    index,
    view,
    onDragStart,
    onDragEnd,
    onDrop,
    isDragging,
}) => {
    const [activeFolderMenuId, setActiveFolderMenuId] = useState<string | null>(null);
    const folderId = usePathfinder() || rootFolderId;
    const navigate = useNavigate();
    const [createModal, setCreateModal] = useState<boolean>(false);
    const [isDragOver, setIsDragOver] = useState(false);
    const [editingFolder, setEditingFolder] = useState<{
        id: string;
        folder_id: string;
        title: string;
        color_id: string;
    } | null>(null);

    const size = 16;

    const currentFilter = useAppSelectot(state => state.filter);

    const closeMenu = () => {
        setActiveFolderMenuId(null);
    };

    const menuRef = useClickOutside(closeMenu);

    const toggleMenu = (id: string) => {
        setActiveFolderMenuId(activeFolderMenuId === id ? null : id);
    };

    const handleEditFolder = (folder: {
        id: string;
        folder_id: string;
        title: string;
        color_id: string;
    }) => {
        setEditingFolder(folder);
        setCreateModal(true);
    };

    const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragOver(false);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Вы действительно хотите переместить эту папку в корзину?')) {
            return;
        } else {
            await deleteFolder([id]);
            queryClient.invalidateQueries({ queryKey: ['folders', folderId] });
        }
    };

    const handleEleminate = async (id: string) => {
        if (!window.confirm('Вы действительно хотите стереть эту папку?')) {
            return;
        } else {
            await eleminateEntity([id]);
            queryClient.invalidateQueries({ queryKey: ['trash'] });
        }
    };

    const handleRepair = async (id: string) => {
        if (!window.confirm('Вы действительно хотите восстановить эту папку?')) {
            return;
        } else {
            await repairEntity([id]);
            queryClient.invalidateQueries({ queryKey: ['trash'] });
            queryClient.invalidateQueries({ queryKey: ['folders'] });
        }
    };

    const handleCopyFolder = async (
        currentId: string,
        currentFolderId: string,
        isFolder: boolean
    ) => {
        await copyEntity(currentId, currentFolderId, isFolder);
        setActiveFolderMenuId(null);
        queryClient.invalidateQueries({ queryKey: ['folders', folderId] });
    };

    const handleFolderDoubleClick = async (e: React.MouseEvent, link: string) => {
        e.preventDefault();

        await queryClient.prefetchQuery({
            queryKey: ['folders', link.split('/')[2]],
            queryFn: () => getFolders(link.split('/')[2]),
        });

        navigate(link);
    };

    return (
        <>
            {view === ViewType.GRID ? (
                <li
                    style={{
                        backgroundColor: folder.color.background_hex,
                        color: folder.color.back_hex,
                    }}
                    className={`${styles.list__item} ${styles.list__item__folder} ${
                        isDragging ? styles.dragging : ''
                    } ${isDragOver ? styles.dragover : ''}`}
                    tabIndex={0}
                    key={index}
                    onClick={e => {
                        e.preventDefault();
                    }}
                    onDoubleClick={e => {
                        if (currentFilter === FILTERS.TRASH) {
                            return;
                        } else {
                            handleFolderDoubleClick(e, `/folder/${folder.id}`);
                        }
                    }}
                    {...(currentFilter !== FILTERS.TRASH && {
                        draggable: 'true',
                        onDragStart: (e: React.DragEvent<HTMLElement>) => {
                            e.stopPropagation();
                            onDragStart({
                                id: folder.id.toString(),
                                title: folder.title,
                                color_id: folder.color.id,
                            })(e);
                        },
                        onDragOver: handleDragOver,
                        onDragLeave: handleDragLeave,
                        onDragEnd: e => {
                            e.stopPropagation();
                            onDragEnd();
                        },
                        onDrop: e => {
                            e.stopPropagation();
                            setIsDragOver(false);
                            onDrop(folder.id.toString())(e);
                        },
                    })}
                >
                    <div className={styles.folders__item}>
                        <div className={styles.folder__icons}>
                            <svg
                                width='36'
                                height='28'
                                viewBox='0 0 36 28'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M30.211 5.01054e-06H5.15799C3.12814 -0.00331084 1.47988 1.63955 1.47657 3.66947C1.47629 3.83464 1.48714 3.99961 1.5091 4.16326C1.56133 4.56682 1.93084 4.85164 2.33447 4.79942C2.43278 4.78671 2.52748 4.75431 2.61294 4.70409C2.93803 4.51495 3.30823 4.4172 3.6843 4.42113H8.93073C9.87754 4.42376 10.7187 5.02593 11.0263 5.92135L11.1516 6.32512C11.6586 7.82603 13.0645 8.83791 14.6487 8.84219H31.6848C32.0712 8.84254 32.4507 8.94416 32.7856 9.13696C32.8988 9.20293 33.0275 9.23747 33.1585 9.2372C33.5654 9.2372 33.8953 8.90727 33.8953 8.50032V3.68426C33.8953 1.6495 32.2458 5.01054e-06 30.211 5.01054e-06Z'
                                    fill={folder.color.back_hex}
                                />
                                <path
                                    d='M33.5313 7.86638C32.9708 7.5397 32.3335 7.36783 31.6847 7.36825H14.6487C13.7018 7.36562 12.8607 6.76345 12.553 5.86803L12.4278 5.46426C11.9207 3.96336 10.5149 2.95147 8.93068 2.94719H3.68425C3.05113 2.94104 2.4281 3.10545 1.88043 3.42322C0.718986 4.07319 -0.000345276 5.3004 1.24332e-07 6.63144V24.316C1.24332e-07 26.3507 1.6495 28.0002 3.68425 28.0002H31.6847C33.7195 28.0002 35.369 26.3507 35.369 24.316V11.0526C35.3735 9.73742 34.672 8.52106 33.5313 7.86638Z'
                                    fill={folder.color.hex}
                                />
                            </svg>
                            <button
                                className={styles.more__actions__button}
                                onClick={() => toggleMenu(folder.id)}
                            >
                                <svg
                                    width='3'
                                    height='15'
                                    viewBox='0 0 3 15'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        fillRule='evenodd'
                                        clipRule='evenodd'
                                        d='M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5ZM3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5ZM1.5 15C2.32843 15 3 14.3284 3 13.5C3 12.6716 2.32843 12 1.5 12C0.671573 12 0 12.6716 0 13.5C0 14.3284 0.671573 15 1.5 15Z'
                                        // fill={folder.color.back_hex}
                                        fill='black'
                                    />
                                </svg>
                            </button>
                        </div>
                        <span className={styles.folder__title}>{folder.title}</span>
                        <div className={styles.folder__descr}>
                            <p className={styles.folder__createdAt}>
                                {dateFormat(folder.created_at)}
                            </p>
                            {folder.share !== 'private' && (
                                <div className={styles.view__container}>
                                    <svg
                                        className={styles.view__svg}
                                        xmlns='http://www.w3.org/2000/svg'
                                        viewBox='0 0 16 16'
                                    >
                                        <g fill='currentColor'>
                                            <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z' />
                                            <path d='M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0' />
                                        </g>
                                    </svg>
                                    {folder.views}
                                </div>
                            )}
                        </div>
                    </div>
                    {activeFolderMenuId === folder.id &&
                        (currentFilter === 'trash' ? (
                            <ActionMenu
                                menuRef={menuRef}
                                onEleminate={() => handleEleminate(folder.id)}
                                onRepair={() => handleRepair(folder.id)}
                            />
                        ) : (
                            <ActionMenu
                                menuRef={menuRef}
                                onCopy={() =>
                                    handleCopyFolder(folder.id.toString(), folderId, true)
                                }
                                onEditFolder={() => {
                                    handleEditFolder({
                                        id: folder.id.toString(),
                                        folder_id: folderId,
                                        title: folder.title,
                                        color_id: folder.color.id,
                                    });
                                    setActiveFolderMenuId(null);
                                }}
                                onDelete={() => handleDelete(folder.id)}
                            />
                        ))}
                </li>
            ) : (
                <li
                    className={`${styles.list__item_line} ${styles.list__item_line__folder} ${
                        isDragging ? styles.dragging : ''
                    } ${isDragOver ? styles.dragover : ''}`}
                    tabIndex={0}
                    key={index}
                    onClick={e => e.preventDefault()}
                    onDoubleClick={e => handleFolderDoubleClick(e, `/folder/${folder.id}`)}
                    style={{
                        backgroundColor: folder.color.background_hex,
                        color: folder.color.back_hex,
                    }}
                    draggable
                    onDragStart={onDragStart({
                        id: folder.id.toString(),
                        title: folder.title,
                        color_id: folder.color.id,
                    })}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDragEnd={onDragEnd}
                    onDrop={e => {
                        e.stopPropagation();
                        setIsDragOver(false);
                        onDrop(folder.id.toString())(e);
                    }}
                >
                    <div className={styles.folders__item_line}>
                        <div className={styles.folder__icons_line}>
                            <svg
                                width='36'
                                height='28'
                                viewBox='0 0 36 28'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M30.211 5.01054e-06H5.15799C3.12814 -0.00331084 1.47988 1.63955 1.47657 3.66947C1.47629 3.83464 1.48714 3.99961 1.5091 4.16326C1.56133 4.56682 1.93084 4.85164 2.33447 4.79942C2.43278 4.78671 2.52748 4.75431 2.61294 4.70409C2.93803 4.51495 3.30823 4.4172 3.6843 4.42113H8.93073C9.87754 4.42376 10.7187 5.02593 11.0263 5.92135L11.1516 6.32512C11.6586 7.82603 13.0645 8.83791 14.6487 8.84219H31.6848C32.0712 8.84254 32.4507 8.94416 32.7856 9.13696C32.8988 9.20293 33.0275 9.23747 33.1585 9.2372C33.5654 9.2372 33.8953 8.90727 33.8953 8.50032V3.68426C33.8953 1.6495 32.2458 5.01054e-06 30.211 5.01054e-06Z'
                                    fill={folder.color.back_hex}
                                />
                                <path
                                    d='M33.5313 7.86638C32.9708 7.5397 32.3335 7.36783 31.6847 7.36825H14.6487C13.7018 7.36562 12.8607 6.76345 12.553 5.86803L12.4278 5.46426C11.9207 3.96336 10.5149 2.95147 8.93068 2.94719H3.68425C3.05113 2.94104 2.4281 3.10545 1.88043 3.42322C0.718986 4.07319 -0.000345276 5.3004 1.24332e-07 6.63144V24.316C1.24332e-07 26.3507 1.6495 28.0002 3.68425 28.0002H31.6847C33.7195 28.0002 35.369 26.3507 35.369 24.316V11.0526C35.3735 9.73742 34.672 8.52106 33.5313 7.86638Z'
                                    fill={folder.color.hex}
                                />
                            </svg>
                            <span className={styles.folder__title_line}>{folder.title}</span>
                        </div>
                        <div className={styles.folder__descr_line}>
                            <p className={styles.folder__createdAt_line}>
                                {dateFormat(folder.created_at)}
                            </p>
                        </div>
                        <div className={styles.view__container_line}>
                            <svg
                                className={styles.view__svg_line}
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 16 16'
                            >
                                <g fill='currentColor'>
                                    <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z' />
                                    <path d='M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0' />
                                </g>
                            </svg>
                            {folder.views}
                        </div>
                        <div className={styles.actions__menu}>
                            {currentFilter === 'trash' ? (
                                <>
                                    <button
                                        className={styles.action__button}
                                        onClick={e => {
                                            e.stopPropagation();
                                            handleRepair(folder.id);
                                        }}
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width={size}
                                            height={size}
                                            viewBox='0 0 16 16'
                                        >
                                            <path
                                                fill='currentColor'
                                                d='M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z'
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        className={styles.action__button}
                                        onClick={e => {
                                            e.stopPropagation();
                                            handleEleminate(folder.id);
                                        }}
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width={size}
                                            height={size}
                                            viewBox='0 0 16 16'
                                        >
                                            <path
                                                fill='currentColor'
                                                d='M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293l4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547L3.453 8.254L1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z'
                                            />
                                        </svg>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        className={styles.action__button}
                                        onClick={e => {
                                            e.stopPropagation();
                                            handleEditFolder({
                                                id: folder.id.toString(),
                                                folder_id: folderId,
                                                title: folder.title,
                                                color_id: folder.color.id,
                                            });
                                        }}
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width={size}
                                            height={size}
                                            viewBox='0 -960 960 960'
                                            fill='currentColor'
                                        >
                                            <path d='M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z' />
                                        </svg>
                                    </button>
                                    <button
                                        className={styles.action__button}
                                        onClick={() =>
                                            handleCopyFolder(folder.id.toString(), folderId, true)
                                        }
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width={size}
                                            height={size}
                                            viewBox='0 0 16 16'
                                        >
                                            <path
                                                fill='currentColor'
                                                fillRule='evenodd'
                                                d='M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z'
                                            />
                                        </svg>
                                    </button>
                                    <button
                                        className={styles.action__button}
                                        onClick={() => handleDelete(folder.id.toString())}
                                    >
                                        <svg
                                            xmlns='http://www.w3.org/2000/svg'
                                            width={size}
                                            height={size}
                                            viewBox='0 0 1024 1024'
                                        >
                                            <path
                                                fill='currentColor'
                                                fillOpacity='.15'
                                                d='M292.7 840h438.6l24.2-512h-487z'
                                            />
                                            <path
                                                fill='currentColor'
                                                d='M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32m-504-72h304v72H360zm371.3 656H292.7l-24.2-512h487z'
                                            />
                                        </svg>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </li>
            )}
            {createModal && (
                <FolderFormModal
                    mode='edit'
                    onClose={() => {
                        setCreateModal(false);
                        setEditingFolder(null);
                    }}
                    initialData={{
                        title: editingFolder?.title || '',
                        color: editingFolder?.color_id || 'default',
                        parentId: editingFolder?.folder_id || folderId,
                    }}
                    folderId={editingFolder?.id}
                />
            )}
        </>
    );
};
