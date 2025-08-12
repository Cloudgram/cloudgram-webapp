import { SearchWidget } from '@/widgets/Search/SearchWidget';
import { isSearchInHeader } from '@shared/lib/isSearchInHeader';
import { useLocation } from 'react-router-dom';
import styles from './Header.module.scss';

export const HeaderSearch = () => {
    const { pathname } = useLocation();
    const shouldShowSearchInHeader = isSearchInHeader(pathname);

    return (
        <>
            {shouldShowSearchInHeader && (
                <div className={styles.header__search}>
                    <SearchWidget searchInputClassName={styles.header__search__input} />
                </div>
            )}
        </>
    );
};
