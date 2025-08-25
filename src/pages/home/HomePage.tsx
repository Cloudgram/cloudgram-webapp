import { SearchWidget } from '@/widgets/Search/SearchWidget';
import styles from '../pages.module.scss';
import { FileExplorerWidget } from '@/widgets/FileExplorer/FileExplorerWidget';
import React from 'react';

export const HomePage = React.memo(() => {
    return (
        <section className={styles.pageSection}>
            <SearchWidget searchInputClassName={styles.searchInput} />
            <FileExplorerWidget />
        </section>
    );
});
