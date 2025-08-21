import type { FileCardArgs } from '../types/file.types';
import styles from './FileCard.module.scss';
import { FileIcon } from './FileIcon';

export const FileCard = ({ fileData, viewMode }: FileCardArgs) => {
    return (
        <div className={styles.fileCard__container}>
            <FileIcon extension={fileData.extension} size={20} />
            <h1 className={styles.fileCard__title}>
                {fileData.title}
                {viewMode === 'grid' ? null : `.${fileData.extension}`}
            </h1>
        </div>
    );
};
