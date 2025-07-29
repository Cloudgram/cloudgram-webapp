import { SearchWidget } from '@/widgets/Search/SearchWidget';
import styles from './HomePage.module.scss';
import { FileExplorerWidget } from '@/widgets/FileExplorer/FileExplorerWidget';

export const HomePage = () => {
    return (
        <div className={styles.homepage}>
            <SearchWidget />
            <FileExplorerWidget />
        </div>
    );
};
