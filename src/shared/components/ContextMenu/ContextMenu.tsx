import styles from './ContextMenu.module.scss';
import type { ReactNode } from 'react';

export interface ContextMenuItem {
    content: ReactNode;
    onClick: () => void;
}

interface ContextMenuProps {
    items: ContextMenuItem[];
    ref: React.RefObject<HTMLDivElement | null>;
    viewMode: 'list' | 'grid';
}

export const ContextMenu = ({ items, ref, viewMode }: ContextMenuProps) => {
    return (
        <div
            ref={ref}
            className={`${styles.ContextMenu} ${
                viewMode === 'list' ? styles.ContextMenu__list : ''
            }`}
        >
            <ul className={styles.ContextMenu__list}>
                {items.map((item, idx) => (
                    <li key={idx} onClick={item.onClick} className={styles.ContextMenu__item}>
                        {item.content}
                    </li>
                ))}
            </ul>
        </div>
    );
};
