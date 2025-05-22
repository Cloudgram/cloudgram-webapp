import { copyEntity, eleminateEntity, repairEntity } from '../../api/shared';
import { rootFolderId } from '../../constants/rootFolder';
import { useAppSelectot } from '../../store/store';
// import { AnimatedWrapper } from '../../utils/animations/ListAnimation';
import {
    ActionMenu,
    dateFormat,
    deleteFile,
    downloadFile,
    getFileColor,
    getFileIcon,
    queryClient,
    styles,
    useClickOutside,
    usePathfinder,
    useState,
    ViewType,
    RootFolderType,
    FC,
} from './index';

interface IFileItemProps {
    file: RootFolderType['files'][number];
    index: number;
    view: ViewType;
}

export const FileItem: FC<IFileItemProps> = ({ file, index, view }) => {
    const fileColors = getFileColor(file.extension);
    const [activeFileMenuId, setActiveFileMenuId] = useState<number | null>(null);
    const folderId = usePathfinder() || rootFolderId;

    const currentFilter = useAppSelectot(state => state.filter);

    const closeMenu = () => {
        setActiveFileMenuId(null);
    };

    const menuRef = useClickOutside(closeMenu);

    const toggleMenu = (id: number) => {
        setActiveFileMenuId(activeFileMenuId === id ? null : id);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Вы действительно хотите удалить этот файл?')) {
            return;
        } else {
            await deleteFile([id]);
            queryClient.invalidateQueries({ queryKey: ['folders', folderId] });
        }
    };

    const handleCopyFolder = async (
        currentId: string,
        currentFolderId: string,
        isFolder: boolean
    ) => {
        await copyEntity(currentId, currentFolderId, isFolder);
        queryClient.invalidateQueries({ queryKey: ['folders', currentFolderId] });
        setActiveFileMenuId(null);
    };

    const handleEleminate = async (id: string) => {
        if (!window.confirm('Вы действительно хотите стереть этот файл?')) {
            return;
        } else {
            await eleminateEntity([id]);
            queryClient.invalidateQueries({ queryKey: ['trash'] });
        }
    };

    const handleRepair = async (id: string) => {
        if (!window.confirm('Вы действительно хотите восстановить этот файл?')) {
            return;
        } else {
            await repairEntity([id]);
            queryClient.invalidateQueries({ queryKey: ['trash'] });
            queryClient.invalidateQueries({ queryKey: ['folders'] });
        }
    };

    const handleFileDownload = async (id: string, name: string, extension: string) => {
        await downloadFile(id, name, extension);
        setActiveFileMenuId(null);
    };

    return (
        <>
            {view === ViewType.GRID ? (
                <li
                    style={{
                        backgroundColor: fileColors?.backgroundColor || 'gray',
                        color: fileColors?.color || '',
                    }}
                    className={styles.list__item}
                    key={index}
                    tabIndex={0}
                >
                    <div className={styles.folders__item}>
                        <div className={styles.folder__icons}>
                            {getFileIcon(file.extension)}
                            <button
                                className={styles.more__actions__button}
                                onClick={() => toggleMenu(file.id)}
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
                                        fill='black'
                                    />
                                </svg>
                            </button>
                            {activeFileMenuId === file.id &&
                                (currentFilter === 'trash' ? (
                                    <ActionMenu
                                        menuRef={menuRef}
                                        onEleminate={() => handleEleminate(file.id)}
                                        onRepair={() => handleRepair(file.id)}
                                    />
                                ) : (
                                    <ActionMenu
                                        menuRef={menuRef}
                                        onDownload={() =>
                                            handleFileDownload(
                                                file.id.toString(),
                                                file.title,
                                                file.extension
                                            )
                                        }
                                        onDelete={() => handleDelete(file.id)}
                                        onCopy={() =>
                                            handleCopyFolder(file.id.toString(), folderId, false)
                                        }
                                    />
                                ))}
                        </div>
                        <span className={styles.folder__title}>{file.title}</span>
                        <div className={styles.folder__descr}>
                            <p className={styles.folder__createdAt}>
                                {dateFormat(file.created_at)}
                            </p>
                            {file.share !== 'private' && (
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
                                    {file.views}
                                </div>
                            )}
                        </div>
                    </div>
                </li>
            ) : (
                <li
                    style={{
                        backgroundColor: fileColors?.backgroundColor || 'gray',
                        color: fileColors?.color || '',
                    }}
                    className={styles.list__item_line}
                    key={index}
                    tabIndex={0}
                >
                    <div className={styles.folders__item_line}>
                        <div className={styles.folder__icons_line}>
                            {getFileIcon(file.extension)}
                            <span
                                className={styles.folder__title_line}
                            >{`${file.title}.${file.extension}`}</span>
                        </div>
                        <div className={styles.folder__descr_line}>
                            <p className={styles.folder__createdAt_line}>
                                {dateFormat(file.created_at)}
                            </p>
                        </div>
                        <div className={styles.view__container_line}>
                            <svg
                                className={styles.view__svg_line}
                                xmlns='http://www.w3.org/2000/svg'
                                width='16'
                                height='16'
                                viewBox='0 0 16 16'
                            >
                                <g fill='currentColor'>
                                    <path d='M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z' />
                                    <path d='M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0' />
                                </g>
                            </svg>
                            {file.views}
                        </div>
                        <div className={styles.actions__menu}>
                            <button
                                className={styles.action__button}
                                onClick={() =>
                                    handleFileDownload(
                                        file.id.toString(),
                                        file.title,
                                        file.extension
                                    )
                                }
                            >
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                                    <g
                                        fill='none'
                                        stroke='currentColor'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                    >
                                        <path d='M12 22v-9m0 9l-2.5-2m2.5 2l2.5-2M5.034 9.117A4.002 4.002 0 0 0 6 17h1' />
                                        <path d='M15.83 7.138a5.5 5.5 0 0 0-10.796 1.98S5.187 10 5.5 10.5' />
                                        <path d='M17 17a5 5 0 1 0-1.17-9.862L14.5 7.5' />
                                    </g>
                                </svg>
                            </button>
                            <button
                                className={styles.action__button}
                                onClick={() => handleCopyFolder(file.id, folderId, false)}
                            >
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    width='16'
                                    height='16'
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
                                onClick={() => handleDelete(file.id.toString())}
                            >
                                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1024 1024'>
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
                        </div>
                    </div>
                </li>
            )}
        </>
    );
};
