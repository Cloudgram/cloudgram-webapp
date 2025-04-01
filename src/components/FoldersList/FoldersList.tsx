import { useNavigate } from 'react-router-dom'
import { deleteFile, downloadFile } from '../../api/Files'
import { RootFolderType } from '../../types/RootType'
import { styles, getFolders, dateFormat, Filters, useEffect, useState, useQuery, Link, useParams, queryClient, deleteFolder } from './index'
import { FileActionMenu } from '../FileActionMenu/FileActionMenu';
import { useClickOutside } from '../../hooks/useClickOutside'
import { FolderActionMenu } from '../FolderActionMenu copy/FolderActionMenu'
import { getFileIcon } from '../../utils/getFileIcon'
import { getFileColor } from '../../utils/getFileColor'


export const FoldersList = () => {
    const [foldersList, setFoldersList] = useState<RootFolderType | null>(null)
    const [filesList, setFilesList] = useState<RootFolderType | null>(null)
    const [listOrientation, setListOrientation] = useState<boolean>(true)
    const [activeFileMenuId, setActiveFileMenuId] = useState<number | null>(null);
    const [activeFolderMenuId, setActiveFolderMenuId] = useState<number | null>(null);
    const { folderId = '0' } = useParams();
    const navigate = useNavigate();

    const closeMenu = () => {
        setActiveFileMenuId(null);
        setActiveFolderMenuId(null);
    }

    const menuRef = useClickOutside(closeMenu);

    const { data } = useQuery<RootFolderType>({
        queryKey: ['folders', folderId],
        queryFn: () => getFolders(folderId),
    })

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries({ queryKey: ['folders'] });
            setFoldersList(data.folders)
            setFilesList(data.files)
        }
    }, [data])

    const handleFolderDelete = async (id: number) => {
        await deleteFolder(String(id));
        queryClient.invalidateQueries({ queryKey: ['folders', folderId] });
    }

    const handleFileDelete = async (id: string) => {
        await deleteFile(id);
        queryClient.invalidateQueries({ queryKey: ['folders', folderId] });
    }

    const handleFileDownload = async (id: string, name: string, extension: string) => {
        await downloadFile(id, name, extension);
        setActiveFileMenuId(null);
    }

    const handleDoubleClick = (e: React.MouseEvent, link: string) => {
        e.preventDefault();
        navigate(link);
    };

    const toggleFileActionMenu = (id: number) => {
        setActiveFileMenuId(activeFileMenuId === id ? null : id);
    };

    const toggleFolderActionMenu = (id: number) => {
        setActiveFolderMenuId(activeFolderMenuId === id ? null : id);
    };


    return (
        <main className={styles.main__container}>
            <Filters />
            <div className={styles.list__container}>
                <div className={styles.list__header}>
                    <button className={styles.list__title}>
                        Folder Title
                    </button>
                    <div className={styles.list__orientation}>
                        <button
                            className={listOrientation ? styles.block__orientation_active : styles.block__orientation}
                            onClick={() => setListOrientation(true)}
                        >
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <rect x="0.5" y="0.5" width="8" height="8" stroke="#22215B" />
                                <rect x="0.5" y="8.5" width="8" height="8" stroke="#22215B" />
                                <rect x="8.5" y="0.5" width="8" height="8" stroke="#22215B" />
                                <rect x="8.5" y="8.5" width="8" height="8" stroke="#22215B" />
                            </svg>
                        </button>
                        <button
                            className={listOrientation ? styles.line__orientation : styles.line__orientation_active}
                            onClick={() => setListOrientation(false)}
                        >
                            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M0 0H15V1H0V0ZM0 7H15V8H0V7ZM15 14H0V15H15V14Z" fill="#B0C0D0" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className={styles.folders__container}>
                    {listOrientation ? (
                        <ul className={styles.folders__list}>
                            {Array.isArray(foldersList) && foldersList.map((folder, index) => (
                                <li style={{ backgroundColor: folder.color.background_hex, color: folder.color.back_hex }} className={styles.list__item} key={index}>
                                    <Link
                                        to={`/folder/${folder.id}`}
                                        onClick={(e) => e.preventDefault()}
                                        onDoubleClick={(e) => handleDoubleClick(e, `/folder/${folder.id}`)}
                                        style={{ color: folder.color.back_hex, textDecoration: 'none' }}
                                    >
                                        <div className={styles.folders__item}>
                                            <div className={styles.folder__icons}>
                                                <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M30.211 5.01054e-06H5.15799C3.12814 -0.00331084 1.47988 1.63955 1.47657 3.66947C1.47629 3.83464 1.48714 3.99961 1.5091 4.16326C1.56133 4.56682 1.93084 4.85164 2.33447 4.79942C2.43278 4.78671 2.52748 4.75431 2.61294 4.70409C2.93803 4.51495 3.30823 4.4172 3.6843 4.42113H8.93073C9.87754 4.42376 10.7187 5.02593 11.0263 5.92135L11.1516 6.32512C11.6586 7.82603 13.0645 8.83791 14.6487 8.84219H31.6848C32.0712 8.84254 32.4507 8.94416 32.7856 9.13696C32.8988 9.20293 33.0275 9.23747 33.1585 9.2372C33.5654 9.2372 33.8953 8.90727 33.8953 8.50032V3.68426C33.8953 1.6495 32.2458 5.01054e-06 30.211 5.01054e-06Z" fill={folder.color.back_hex} />
                                                    <path d="M33.5313 7.86638C32.9708 7.5397 32.3335 7.36783 31.6847 7.36825H14.6487C13.7018 7.36562 12.8607 6.76345 12.553 5.86803L12.4278 5.46426C11.9207 3.96336 10.5149 2.95147 8.93068 2.94719H3.68425C3.05113 2.94104 2.4281 3.10545 1.88043 3.42322C0.718986 4.07319 -0.000345276 5.3004 1.24332e-07 6.63144V24.316C1.24332e-07 26.3507 1.6495 28.0002 3.68425 28.0002H31.6847C33.7195 28.0002 35.369 26.3507 35.369 24.316V11.0526C35.3735 9.73742 34.672 8.52106 33.5313 7.86638Z" fill={folder.color.hex} />
                                                </svg>
                                                <button
                                                    className={styles.more__actions__button}
                                                    onClick={() => toggleFolderActionMenu(folder.id)}
                                                >
                                                    <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5ZM3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5ZM1.5 15C2.32843 15 3 14.3284 3 13.5C3 12.6716 2.32843 12 1.5 12C0.671573 12 0 12.6716 0 13.5C0 14.3284 0.671573 15 1.5 15Z" fill={folder.color.back_hex} />
                                                    </svg>
                                                </button>
                                            </div>
                                            <span className={styles.folder__title}>{folder.title}</span>
                                            <div className={styles.folder__descr}>
                                                <p className={styles.folder__createdAt}>
                                                    {dateFormat(folder.created_at)}
                                                </p>
                                                {(folder.share !== 'private') &&
                                                    <div className={styles.view__container}>
                                                        <svg className={styles.view__svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <g fill="currentColor">
                                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0" />
                                                            </g>
                                                        </svg>
                                                        {folder.views}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        {activeFolderMenuId === folder.id && (
                                            <FolderActionMenu
                                                menuRef={menuRef}
                                                onDelete={() => handleFolderDelete(folder.id)}
                                            />
                                        )}
                                    </Link>
                                </li>
                            ))}
                            {Array.isArray(filesList) && filesList.map((file, index) => {
                                const fileColors = getFileColor(file.extension);
                                return (
                                    <li
                                        style={{
                                            backgroundColor: fileColors?.backgroundColor || 'gray',
                                            color: fileColors?.color || '',
                                        }}
                                        className={styles.list__item}
                                        key={index}
                                    >
                                        <div className={styles.folders__item}>
                                            <div className={styles.folder__icons}>
                                                {getFileIcon(file.extension)}
                                                <button
                                                    className={styles.more__actions__button}
                                                    onClick={() => toggleFileActionMenu(file.id)}
                                                >
                                                    <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path fillRule="evenodd" clipRule="evenodd" d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5ZM3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5ZM1.5 15C2.32843 15 3 14.3284 3 13.5C3 12.6716 2.32843 12 1.5 12C0.671573 12 0 12.6716 0 13.5C0 14.3284 0.671573 15 1.5 15Z" fill='black' />
                                                    </svg>
                                                </button>
                                                {activeFileMenuId === file.id && (
                                                    <FileActionMenu
                                                        menuRef={menuRef}
                                                        onDownload={() => handleFileDownload(file.id.toString(), file.title, file.extension)}
                                                        onDelete={() => handleFileDelete(file.id)}
                                                    />
                                                )}
                                            </div>
                                            <span className={styles.folder__title}>{file.title}</span>
                                            <div className={styles.folder__descr}>
                                                <p className={styles.folder__createdAt}>
                                                    {dateFormat(file.created_at)}
                                                </p>
                                                {(file.share !== 'private') &&
                                                    <div className={styles.view__container}>
                                                        <svg className={styles.view__svg} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                            <g fill="currentColor">
                                                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0" />
                                                            </g>
                                                        </svg>
                                                        {file.views}
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <ul className={styles.folders__list_line}>
                            {Array.isArray(foldersList) && foldersList.map((folder, index) => (
                                <Link
                                    to={`/folder/${folder.id}`}
                                    onClick={(e) => e.preventDefault()}
                                    onDoubleClick={(e) => handleDoubleClick(e, `/folder/${folder.id}`)}
                                    style={{ backgroundColor: folder.color.background_hex, color: folder.color.back_hex }}
                                    className={styles.list__item_line} key={index}
                                >
                                    <div className={styles.folders__item_line}>
                                        <div className={styles.folder__icons_line}>
                                            <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M30.211 5.01054e-06H5.15799C3.12814 -0.00331084 1.47988 1.63955 1.47657 3.66947C1.47629 3.83464 1.48714 3.99961 1.5091 4.16326C1.56133 4.56682 1.93084 4.85164 2.33447 4.79942C2.43278 4.78671 2.52748 4.75431 2.61294 4.70409C2.93803 4.51495 3.30823 4.4172 3.6843 4.42113H8.93073C9.87754 4.42376 10.7187 5.02593 11.0263 5.92135L11.1516 6.32512C11.6586 7.82603 13.0645 8.83791 14.6487 8.84219H31.6848C32.0712 8.84254 32.4507 8.94416 32.7856 9.13696C32.8988 9.20293 33.0275 9.23747 33.1585 9.2372C33.5654 9.2372 33.8953 8.90727 33.8953 8.50032V3.68426C33.8953 1.6495 32.2458 5.01054e-06 30.211 5.01054e-06Z" fill={folder.color.back_hex} />
                                                <path d="M33.5313 7.86638C32.9708 7.5397 32.3335 7.36783 31.6847 7.36825H14.6487C13.7018 7.36562 12.8607 6.76345 12.553 5.86803L12.4278 5.46426C11.9207 3.96336 10.5149 2.95147 8.93068 2.94719H3.68425C3.05113 2.94104 2.4281 3.10545 1.88043 3.42322C0.718986 4.07319 -0.000345276 5.3004 1.24332e-07 6.63144V24.316C1.24332e-07 26.3507 1.6495 28.0002 3.68425 28.0002H31.6847C33.7195 28.0002 35.369 26.3507 35.369 24.316V11.0526C35.3735 9.73742 34.672 8.52106 33.5313 7.86638Z" fill={folder.color.hex} />
                                            </svg>
                                            <span className={styles.folder__title_line}>{folder.title}</span>
                                        </div>
                                        <div className={styles.folder__descr_line}>
                                            <p className={styles.folder__createdAt_line}>
                                                {dateFormat(folder.created_at)}
                                            </p>
                                        </div>
                                        <div className={styles.view__container_line}>
                                            <svg className={styles.view__svg_line} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                                <g fill="currentColor">
                                                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0" />
                                                </g>
                                            </svg>
                                            {folder.views}
                                        </div>
                                        <div className={styles.actions__menu}>
                                            <button
                                                className={styles.action__button}
                                                onClick={() => handleFolderDelete(folder.id.toString())}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                                    <path fill="currentColor" fillOpacity=".15" d="M292.7 840h438.6l24.2-512h-487z" />
                                                    <path fill="currentColor" d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32m-504-72h304v72H360zm371.3 656H292.7l-24.2-512h487z" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                            {Array.isArray(filesList) && filesList.map((file, index) => {
                                const fileColors = getFileColor(file.extension);
                                return (
                                    <li
                                        style={{
                                            backgroundColor: fileColors?.backgroundColor || 'gray',
                                            color: fileColors?.color || '',
                                        }}
                                        className={styles.list__item_line}
                                        key={index}
                                    >
                                        <div className={styles.folders__item_line}>
                                            <div className={styles.folder__icons_line}>
                                                {getFileIcon(file.extension)}
                                                <span className={styles.folder__title_line}>{`${file.title}.${file.extension}`}</span>
                                            </div>
                                            <div className={styles.folder__descr_line}>
                                                <p className={styles.folder__createdAt_line}>
                                                    {dateFormat(file.created_at)}
                                                </p>
                                            </div>
                                            <div className={styles.view__container_line}>
                                                <svg className={styles.view__svg_line} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                                    <g fill="currentColor">
                                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0" /></g>
                                                </svg>
                                                {/* <svg className={styles.view__svg_line} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke='black' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke='black' strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg> */}
                                                {file.views}
                                            </div>
                                            <div className={styles.actions__menu}>
                                                <button
                                                    className={styles.action__button}
                                                    onClick={() => handleFileDownload(file.id.toString(), file.title, file.extension)}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                                        <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                                                            <path d="M12 22v-9m0 9l-2.5-2m2.5 2l2.5-2M5.034 9.117A4.002 4.002 0 0 0 6 17h1" />
                                                            <path d="M15.83 7.138a5.5 5.5 0 0 0-10.796 1.98S5.187 10 5.5 10.5" />
                                                            <path d="M17 17a5 5 0 1 0-1.17-9.862L14.5 7.5" />
                                                        </g>
                                                    </svg>
                                                </button>
                                                <button
                                                    className={styles.action__button}
                                                    onClick={() => handleFileDelete(file.id.toString())}
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                                                        <path fill="currentColor" fillOpacity=".15" d="M292.7 840h438.6l24.2-512h-487z" />
                                                        <path fill="currentColor" d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32m-504-72h304v72H360zm371.3 656H292.7l-24.2-512h487z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </main>
    )
}