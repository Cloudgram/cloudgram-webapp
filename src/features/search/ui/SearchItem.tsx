import { Link } from 'react-router-dom';
import styles from './Search.module.scss';
import type { SearchItemType } from '../model/search.types';
import { ROUTES } from '@/app/Router/routes.config';

interface SearchItemProps {
    icon: React.ReactNode;
    title: string;
    items: SearchItemType[];
}

export const SearchItem = ({ icon, title, items }: SearchItemProps) => {
    return (
        <>
            {items.length > 0 && (
                <div className={styles.searchResults__result}>
                    <div className={styles.searchResults__label}>
                        {icon}
                        <h3 className={styles.searchResults__labelName}>{title}</h3>
                    </div>
                    <div className={styles.searchResults__items}>
                        {items.map(item => (
                            <Link
                                key={item.id}
                                className={styles.searchResults__item}
                                to={
                                    item.fs_type === 'file'
                                        ? item.parent_folder_id === null
                                            ? ROUTES.PRIVATE.DASHBOARD.HOME
                                            : `/folder/${item.parent_folder_id}`
                                        : `/folder/${item.id}`
                                }
                            >
                                {item.title}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};
