import { SearchWidget } from '@/widgets/Search/SearchWidget';
import styles from './HomePage.module.scss';

export const HomePage = () => {
    return (
        <div className={styles.homepage}>
            <SearchWidget />
        </div>
    );
};
