import { FolderIconSmall } from '@/shared/assets/icons/all/FolderIconSmall';
import type { folderCardArgs } from '../types/folder.types';
import styles from './FolderCard.module.scss';
import { useState } from 'react';
import { ContextMenu } from '@/shared/components/ContextMenu/ContextMenu';
import { useClickOutside } from '@/shared/hooks/useClickOutside';

export const FolderCard = ({
    folderData,
    onDoubleClick,
    viewMode,
    menuActions,
}: folderCardArgs) => {
    const [contextMenuOpen, setContextMenuOpen] = useState(false);
    const actionMenuRef = useClickOutside<HTMLDivElement>(() => setContextMenuOpen(false), {
        enabled: contextMenuOpen,
    });

    return (
        <div onDoubleClick={onDoubleClick} className={styles.folderCard__container}>
            <div className={styles.folderCard__body}>
                <FolderIconSmall color={folderData.color?.hex} />
                <h1 className={styles.folderCard__title}>{folderData.title}</h1>
            </div>
            <button
                className={styles.folderCard__button}
                onClick={() => setContextMenuOpen(prev => !prev)}
            >
                <svg
                    width='3'
                    height='11'
                    viewBox='0 0 3 11'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                >
                    <path
                        d='M1.60059 8.7998C0.993073 8.7998 0.5 9.29288 0.5 9.90039C0.500211 10.5077 0.993203 11 1.60059 11C2.20779 10.9998 2.69998 10.5076 2.7002 9.90039C2.7002 9.29301 2.20792 8.80002 1.60059 8.7998ZM1.60059 4.40039C0.993073 4.40039 0.5 4.89249 0.5 5.5C0.5 6.10751 0.993073 6.59961 1.60059 6.59961C2.20792 6.5994 2.7002 6.10738 2.7002 5.5C2.7002 4.89262 2.20792 4.4006 1.60059 4.40039ZM1.60059 0C0.993203 0 0.500211 0.492276 0.5 1.09961C0.5 1.70712 0.993073 2.2002 1.60059 2.2002C2.20792 2.19998 2.7002 1.70699 2.7002 1.09961C2.69998 0.492406 2.20779 0.000211023 1.60059 0Z'
                        fill='#497FFF'
                    />
                </svg>
                {contextMenuOpen && (
                    <ContextMenu items={menuActions} ref={actionMenuRef} viewMode={viewMode} />
                )}
            </button>
        </div>
    );
};
