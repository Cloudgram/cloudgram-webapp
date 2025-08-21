import { CategoryViewerWidget } from '@/widgets/CategoryViewer/CategoryViewerWidget';
import styles from '../pages.module.scss';

export const DocumentsPage = () => {
    return (
        <section className={styles.pageSection}>
            <CategoryViewerWidget />
        </section>
    );
};
