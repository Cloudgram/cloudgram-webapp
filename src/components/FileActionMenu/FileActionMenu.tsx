import styles from './FileActionMenu.module.scss'

interface FileActionMenuProps {
    onDelete: () => void
    onDownload: () => void
    menuRef: React.RefObject<HTMLDivElement>
}

export const FileActionMenu: React.FC<FileActionMenuProps> = ({ onDelete, onDownload, menuRef }) => {
    return (
        <div className={styles.actionMenu} ref={menuRef}>
            <button className={styles.actionMenu__button} onClick={onDownload}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        <path d="M12 22v-9m0 9l-2.5-2m2.5 2l2.5-2M5.034 9.117A4.002 4.002 0 0 0 6 17h1" />
                        <path d="M15.83 7.138a5.5 5.5 0 0 0-10.796 1.98S5.187 10 5.5 10.5" />
                        <path d="M17 17a5 5 0 1 0-1.17-9.862L14.5 7.5" />
                    </g>
                </svg>
                Скачать
            </button>
            <button className={styles.actionMenu__button} onClick={onDelete}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024">
                    <path fill="currentColor" fillOpacity=".15" d="M292.7 840h438.6l24.2-512h-487z" />
                    <path fill="currentColor" d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32m-504-72h304v72H360zm371.3 656H292.7l-24.2-512h487z" />
                </svg>
                Удалить
            </button>
        </div>
    )
}