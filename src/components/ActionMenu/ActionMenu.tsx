import styles from './ActionMenu.module.scss'

interface ActionMenuProps {
    onDelete: () => void
    onDownload: () => void
}

export const ActionMenu: React.FC<ActionMenuProps> = ({ onDelete, onDownload }) => {
    return (
        <div className={styles.actionMenu}>
            <button className={styles.actionMenu__button} onClick={onDelete}>Удалить</button>
            <button className={styles.actionMenu__button} onClick={onDownload}>Скачать</button>
        </div>
    )
}