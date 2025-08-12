import { Link } from 'react-router-dom';
import { fileExplorerFilters } from '../model/config';
import styles from './FileExplorer.module.scss';
import { Box, Button } from '@chakra-ui/react';

export const FileExplorerFilters = () => {
    return (
        <Box as={'ul'} className={styles.filters__container}>
            {Array.isArray(fileExplorerFilters) &&
                fileExplorerFilters.map(filter => (
                    <li key={filter.id}>
                        <Button variant={'ghost'} asChild className={styles.filters__button}>
                            <Link to={filter.route}>{filter.name}</Link>
                        </Button>
                    </li>
                ))}
        </Box>
    );
};
