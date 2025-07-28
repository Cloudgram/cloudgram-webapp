import { Input } from '@chakra-ui/react';
import styles from './SearchInput.module.scss';

export const SearchInput = () => {
    return (
        <div className={styles.searchInput__container}>
            <Input className={styles.searchInput__input} variant={'subtle'} placeholder='Search' />
        </div>
    );
};
