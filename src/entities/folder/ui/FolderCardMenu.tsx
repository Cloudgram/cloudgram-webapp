import styles from './FolderCardMenu.module.css';
import { ContextMenu } from '@/shared/ui/PopoverMenu/ContextMenu';

interface FolderCardMenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export const FolderCardMenu = ({ isOpen, onClose }: FolderCardMenuProps) => {
    return (
        <ContextMenu
            isOpen={isOpen}
            onClose={onClose}
            items={[
                {
                    content: <p>Переименовать</p>,
                    onClick: () => console.log('rename'),
                },
                {
                    content: <p className={styles.red}>Скачать</p>,
                    onClick: () => console.log('download'),
                },
                {
                    content: <p>Удалить</p>,
                    onClick: () => console.log('delete'),
                },
            ]}
        />
    );
};
