import { SearchInput } from '@features/search/ui/SearchInput';
import { SearchResult } from '@features/search/ui/SearchResult';
import styles from './SearchWidget.module.scss';
import { useState } from 'react';

interface SearchWidgetProps {
    searchInputClassName?: string;
    searchResultClassName?: string;
}

export const SearchWidget = ({
    searchInputClassName,
    searchResultClassName,
}: SearchWidgetProps) => {
    const [value, setValue] = useState("");
    const [focus, setFocus] = useState(false);

    return (
        <div className={styles.search__widget}>
            <SearchInput className={searchInputClassName} value={value} setValue={setValue} setFocus={setFocus}/>
            <SearchResult className={searchResultClassName} isOpen={focus && value.length > 1} />
        </div> 
    );
};
