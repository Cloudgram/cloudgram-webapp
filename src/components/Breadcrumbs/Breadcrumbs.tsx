import { Link } from 'react-router-dom';
import { useFolderHistory } from '../../hooks/queries/useFolderHistory';
import styles from './Breadcrumbs.module.scss';
import { Fragment } from 'react';
import { usePathfinder } from '../../hooks/usePathFinder';

export const Breadcrumbs = () => {
    const folderId = usePathfinder();
    const folderPath = useFolderHistory(folderId ?? '0');

    const handleBreadcrumbClick = (index: number) => {
        const newPath = folderPath.slice(0, index + 1);
        localStorage.setItem('folderHistory', JSON.stringify(newPath));
    };

    return (
        <div className={styles.breadcrumb}>
            {folderId === '0' ? (
                <span className={styles.breadcrumb__home}>Home</span>
            ) : (
                folderPath.map((folder, index) => (
                    <Fragment key={folder.id}>
                        {index === folderPath.length - 1 ? (
                            <span
                                className={`${styles.breadcrumb__link} ${styles.breadcrumb__link_current}`}
                            >
                                {folder.id === '0' ? 'Home' : folder.title}
                            </span>
                        ) : (
                            <Link
                                onClick={() => handleBreadcrumbClick(index)}
                                to={`/folder/${folder.id}`}
                                className={styles.breadcrumb__link}
                            >
                                {folder.id === '0' ? 'Home' : folder.title}
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
