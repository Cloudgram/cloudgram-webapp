import { FolderIconSmall } from '@/shared/assets/icons/FolderIconSmall';
import type { folderCardArgs } from '../types/folderTypes';
import styles from './FolderCard.module.scss';

export const FolderCard = ({ folderData, onDoubleClick }: folderCardArgs) => {
    return (
        <div onDoubleClick={onDoubleClick} className={styles.folderCard__container}>
            <FolderIconSmall color={folderData.color?.hex} />
            <h1 className={styles.folderCard__title}>{folderData.title}</h1>
        </div>
    );
};
