import { fileExplorerFilters } from '../model/config';
import styles from './FileExplorer.module.scss';

export const FileExplorerFilters = () => {
    return (
        <div className={styles.filters__container}>
            {Array.isArray(fileExplorerFilters) &&
                fileExplorerFilters.map(filter => (
                    <button key={filter.id} className={styles.filters__button}>
                        {filter.name}
                    </button>
                ))}
        </div>
    );
};
