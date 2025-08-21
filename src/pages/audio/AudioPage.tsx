import { CategoryViewerWidget } from '@/widgets/CategoryViewer/CategoryViewerWidget';
import styles from '../pages.module.scss';

export const AudioPage = () => {
    return (
        <section className={styles.pageSection}>
            <CategoryViewerWidget />
        </section>
    );
};
