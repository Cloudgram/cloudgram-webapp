import { SearchWidget } from '@/widgets/Search/SearchWidget';
import styles from './HomePage.module.scss';
import { FileExplorerWidget } from '@/widgets/FileExplorer/FileExplorerWidget';
import React from 'react';

export const HomePage = React.memo(() => {
    return (
        <section className={styles.homepage}>
            <SearchWidget searchInputClassName={styles.searchInput} />
            <FileExplorerWidget />
        </section>
    );
});
