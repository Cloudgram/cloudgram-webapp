import { Box } from '@chakra-ui/react';
import styles from './CreateFolder.module.scss';
import { CreateFolderForm } from './CreateFolderForm';

export const CreateFolderModal = () => {
    return (
        <Box className={styles.createFolderModal}>
            <Box className={styles.createFolderModal__container}>
                <CreateFolderForm />
            </Box>
        </Box>
    );
};
