import { CategoryViewerWidget } from '@/widgets/CategoryViewer/CategoryViewerWidget';
import styles from '../pages.module.scss';

export const SharedPage = () => {
    return (
        <section className={styles.pageSection}>
            <CategoryViewerWidget />
        </section>
    );
};
