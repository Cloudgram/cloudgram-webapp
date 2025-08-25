import { CategoryViewerWidget } from '@/widgets/CategoryViewer/CategoryViewerWidget';
import styles from '../pages.module.scss';
import { SearchWidget } from '@/widgets/Search/SearchWidget';

export const AudioPage = () => {
    return (
        <section className={styles.pageSection}>
            <SearchWidget searchInputClassName={styles.searchInput} />
            <CategoryViewerWidget />
        </section>
    );
};
