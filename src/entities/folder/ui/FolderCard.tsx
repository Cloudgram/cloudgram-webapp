import { FolderIconSmall } from '@/shared/assets/icons/all/FolderIconSmall';
import type { folderCardArgs } from '../types/folder.types';
import styles from './FolderCard.module.scss';
import { ContextMenu } from '@/shared/ui/PopoverMenu/ContextMenu';
import { useState } from 'react';

export const FolderCard = ({ folderData, onDoubleClick }: folderCardArgs) => {
    const [contextMenuOpen, setContextMenuOpen] = useState(false);

    return (
        <div onDoubleClick={onDoubleClick} className={styles.folderCard__container}>
            <FolderIconSmall color={folderData.color?.hex} />
            <h1 className={styles.folderCard__title}>{folderData.title}</h1>
            <div
                className={styles.folderCard__button}
                onClick={() => setContextMenuOpen(prev => !prev)}
            >
                <span></span>
                <span></span>
                <span></span>
                <ContextMenu
                    isOpen={contextMenuOpen}
                    onClose={() => setContextMenuOpen(false)}
                    items={[
                        {
                            content: <p>Переименовать</p>,
                            onClick: () => console.log('rename'),
                        },
                        { content: <p>Скачать</p>, onClick: () => console.log('download') },
                        { content: <p>Удалить</p>, onClick: () => console.log('delete') },
                    ]}
                />
            </div>
        </div>
    );
};
