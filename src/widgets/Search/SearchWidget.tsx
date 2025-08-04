import { SearchInput } from '@features/search/ui/SearchInput';
import { SearchResult } from '@features/search/ui/SearchResult';
import styles from './SearchWidget.module.scss';

interface SearchWidgetProps {
    searchInputClassName?: string;
    searchResultClassName?: string;
}

export const SearchWidget = ({
    searchInputClassName,
    searchResultClassName,
}: SearchWidgetProps) => {
    return (
        <div className={styles.search__widget}>
            <SearchInput className={searchInputClassName} />
            <SearchResult className={searchResultClassName} />
        </div>
    );
};
