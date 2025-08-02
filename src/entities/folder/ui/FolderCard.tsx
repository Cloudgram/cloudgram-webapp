import { FolderIconSmall } from '@/shared/assets/icons/FolderIconSmall';
import type { folderCardArgs } from '../types/folderTypes';
import styles from './FolderCard.module.scss';
import { Link } from 'react-router-dom';

export const FolderCard = ({ folderData }: folderCardArgs) => {
    return (
        <Link to={`/folder/${folderData.id}`} className={styles.folderCard__container}>
            <FolderIconSmall color={folderData.color?.hex} />
            <h1 className={styles.folderCard__title}>{folderData.title}</h1>
        </Link>
    );
};
