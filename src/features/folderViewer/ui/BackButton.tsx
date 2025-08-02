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
            width='fit-content'
            paddingLeft={0}
            fontSize={'14px'}
            fontWeight={600}
            variant='plain'
            onClick={handleBackClick}
            className={styles.folderViewer__backButton}
        >{`<- Back`}</Button>
    );
};
