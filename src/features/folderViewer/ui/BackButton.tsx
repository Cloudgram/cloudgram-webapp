import { useNavigate } from 'react-router-dom';
import styles from './FolderViewer.module.scss';
import { Button } from '@chakra-ui/react';

export const BackButton = () => {
    const navigate = useNavigate();
    const handleBackClick = () => {
        navigate(-1);
    };

    return (
        <Button
            variant='plain'
            onClick={handleBackClick}
            className={styles.folderViewer__backButton}
        >{`<- Back`}</Button>
    );
};
