import styles from './FoldersList.module.scss'
import { getFolders } from '../../app/api/Folders'
import { useEffect, useState } from 'react'
import { RootFolderType } from '../../app/types/RootType'
import { dateFormat } from '../../utils/formatDate'

export const FoldersList = () => {
    const [foldersList, setFoldersList] = useState<RootFolderType | null>(null)

    useEffect(() => {
        const fetchFolders = async () => {
            const res = await getFolders()
            setFoldersList(res)
        }
        fetchFolders()
    }, [])

    return (
        <div className={styles.list__container}>
            <div className={styles.list__header}>
                <button className={styles.list__filter}>
                    Resently
                    <svg className={styles.resently__svg} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L7 7L13 1" stroke="#22215B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
                <div className={styles.list__orientation}>
                    <button className={styles.line__orientation}>
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M0 0H15V1H0V0ZM0 7H15V8H0V7ZM15 14H0V15H15V14Z" fill="#B0C0D0" />
                        </svg>
                    </button>
                    <button className={styles.block__orientation}>
                        <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="0.5" y="0.5" width="8" height="8" stroke="#22215B" />
                            <rect x="0.5" y="8.5" width="8" height="8" stroke="#22215B" />
                            <rect x="8.5" y="0.5" width="8" height="8" stroke="#22215B" />
                            <rect x="8.5" y="8.5" width="8" height="8" stroke="#22215B" />
                        </svg>
                    </button>
                </div>
            </div>

            <div className={styles.folders__container}>
                <ul className={styles.folders__list}>
                    {Array.isArray(foldersList) && foldersList.map((folder, index) => (
                        console.log(folder),
                        // console.log(folder.color.background_hex),
                        <li style={{ backgroundColor: folder.color.background_hex, color: folder.color.hex }} className={styles.list__item} key={index}>
                            <div className={styles.folders__item}>
                                <div className={styles.folder__icons}>
                                    <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M30.211 5.01054e-06H5.15799C3.12814 -0.00331084 1.47988 1.63955 1.47657 3.66947C1.47629 3.83464 1.48714 3.99961 1.5091 4.16326C1.56133 4.56682 1.93084 4.85164 2.33447 4.79942C2.43278 4.78671 2.52748 4.75431 2.61294 4.70409C2.93803 4.51495 3.30823 4.4172 3.6843 4.42113H8.93073C9.87754 4.42376 10.7187 5.02593 11.0263 5.92135L11.1516 6.32512C11.6586 7.82603 13.0645 8.83791 14.6487 8.84219H31.6848C32.0712 8.84254 32.4507 8.94416 32.7856 9.13696C32.8988 9.20293 33.0275 9.23747 33.1585 9.2372C33.5654 9.2372 33.8953 8.90727 33.8953 8.50032V3.68426C33.8953 1.6495 32.2458 5.01054e-06 30.211 5.01054e-06Z" fill={folder.color.back_hex} />
                                        <path d="M33.5313 7.86638C32.9708 7.5397 32.3335 7.36783 31.6847 7.36825H14.6487C13.7018 7.36562 12.8607 6.76345 12.553 5.86803L12.4278 5.46426C11.9207 3.96336 10.5149 2.95147 8.93068 2.94719H3.68425C3.05113 2.94104 2.4281 3.10545 1.88043 3.42322C0.718986 4.07319 -0.000345276 5.3004 1.24332e-07 6.63144V24.316C1.24332e-07 26.3507 1.6495 28.0002 3.68425 28.0002H31.6847C33.7195 28.0002 35.369 26.3507 35.369 24.316V11.0526C35.3735 9.73742 34.672 8.52106 33.5313 7.86638Z" fill={folder.color.hex} />
                                    </svg>
                                    <button className={styles.more__actions__button}>
                                        <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5ZM3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5ZM1.5 15C2.32843 15 3 14.3284 3 13.5C3 12.6716 2.32843 12 1.5 12C0.671573 12 0 12.6716 0 13.5C0 14.3284 0.671573 15 1.5 15Z" fill="#FFB110" />
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
                                            <svg className={styles.view__svg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                            {folder.views}
                                        </div>
                                    }
                                </div>
                            </div>
                        </li>
                    ))}
                    {/* <li className={styles.list__item}>
                        <div className={styles.folders__item}>
                            <div className={styles.folder__icons}>
                                <svg width="36" height="28" viewBox="0 0 36 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M30.211 5.01054e-06H5.15799C3.12814 -0.00331084 1.47988 1.63955 1.47657 3.66947C1.47629 3.83464 1.48714 3.99961 1.5091 4.16326C1.56133 4.56682 1.93084 4.85164 2.33447 4.79942C2.43278 4.78671 2.52748 4.75431 2.61294 4.70409C2.93803 4.51495 3.30823 4.4172 3.6843 4.42113H8.93073C9.87754 4.42376 10.7187 5.02593 11.0263 5.92135L11.1516 6.32512C11.6586 7.82603 13.0645 8.83791 14.6487 8.84219H31.6848C32.0712 8.84254 32.4507 8.94416 32.7856 9.13696C32.8988 9.20293 33.0275 9.23747 33.1585 9.2372C33.5654 9.2372 33.8953 8.90727 33.8953 8.50032V3.68426C33.8953 1.6495 32.2458 5.01054e-06 30.211 5.01054e-06Z" fill="#FFB110" />
                                    <path d="M33.5313 7.86638C32.9708 7.5397 32.3335 7.36783 31.6847 7.36825H14.6487C13.7018 7.36562 12.8607 6.76345 12.553 5.86803L12.4278 5.46426C11.9207 3.96336 10.5149 2.95147 8.93068 2.94719H3.68425C3.05113 2.94104 2.4281 3.10545 1.88043 3.42322C0.718986 4.07319 -0.000345276 5.3004 1.24332e-07 6.63144V24.316C1.24332e-07 26.3507 1.6495 28.0002 3.68425 28.0002H31.6847C33.7195 28.0002 35.369 26.3507 35.369 24.316V11.0526C35.3735 9.73742 34.672 8.52106 33.5313 7.86638Z" fill="#FFDE6C" />
                                </svg>
                                <button className={styles.more__actions__button}>
                                    <svg width="3" height="15" viewBox="0 0 3 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M3 1.5C3 2.32843 2.32843 3 1.5 3C0.671573 3 0 2.32843 0 1.5C0 0.671573 0.671573 0 1.5 0C2.32843 0 3 0.671573 3 1.5ZM3 7.5C3 8.32843 2.32843 9 1.5 9C0.671573 9 0 8.32843 0 7.5C0 6.67157 0.671573 6 1.5 6C2.32843 6 3 6.67157 3 7.5ZM1.5 15C2.32843 15 3 14.3284 3 13.5C3 12.6716 2.32843 12 1.5 12C0.671573 12 0 12.6716 0 13.5C0 14.3284 0.671573 15 1.5 15Z" fill="#FFB110" />
                                    </svg>
                                </button>
                            </div>
                            <span className={styles.folder__title}>Folder</span>
                            <div className={styles.folder__descr}>
                                <p className={styles.folder__createdAt}>
                                    December 14.2020
                                </p>
                                <div className={styles.view__container}>
                                    <svg className={styles.view__svg} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M15.0007 12C15.0007 13.6569 13.6576 15 12.0007 15C10.3439 15 9.00073 13.6569 9.00073 12C9.00073 10.3431 10.3439 9 12.0007 9C13.6576 9 15.0007 10.3431 15.0007 12Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        <path d="M12.0012 5C7.52354 5 3.73326 7.94288 2.45898 12C3.73324 16.0571 7.52354 19 12.0012 19C16.4788 19 20.2691 16.0571 21.5434 12C20.2691 7.94291 16.4788 5 12.0012 5Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                    3
                                </div>
                            </div>
                        </div>
                    </li> */}
                </ul>
            </div>
        </div>
    )
}