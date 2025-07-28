import { SearchInput } from '@features/search/ui/SearchInput';
import { SearchResult } from '@features/search/ui/SearchResult';
import styles from './SearchWidget.module.scss';

export const SearchWidget = () => {
    return (
        <div className={styles.search__widget}>
            <SearchInput />
            <SearchResult />
        </div>
    );
};
