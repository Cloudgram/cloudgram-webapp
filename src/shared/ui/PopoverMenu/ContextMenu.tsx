import styles from './ContextMenu.module.scss';
import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';

export interface ContextMenuItem {
    content: ReactNode;
    onClick?: () => void;
}

interface ContextMenuProps {
    isOpen: boolean;
    onClose: () => void;
    items: ContextMenuItem[];
}

export const ContextMenu = ({ isOpen, onClose, items }: ContextMenuProps) => {
    const menuRef = useRef<HTMLDivElement>(null);

    // закрытие при клике вне меню
    useEffect(() => {
        if (!isOpen) return;
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.ContextMenu} ref={menuRef}>
            {items.map((item, idx) => (
                <div
                    key={idx}
                    onClick={() => {
                        item.onClick?.();
                        onClose();
                    }}
                    className={styles.ContextMenu__item}
                >
                    {item.content}
                </div>
            ))}
        </div>
    );
};
