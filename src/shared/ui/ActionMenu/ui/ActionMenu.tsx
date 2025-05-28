import { useEffect } from 'react';
import styles from './ActionMenu.module.scss';
import { animateFileActionMenu } from '@shared/lib/animations';

interface FileActionMenuProps {
    onDelete?: () => void;
    onEleminate?: () => void;
    onRepair?: () => void;
    onDownload?: () => void;
    onFavorite?: () => void;
    onEditFolder?: () => void;
    onShare?: () => void;
    onCopy?: () => void;
    onMove?: () => void;
    isLineList?: boolean;
    menuRef: React.RefObject<HTMLDivElement>;
}

const size = 25;

export const ActionMenu: React.FC<FileActionMenuProps> = ({
    onDelete,
    onDownload,
    menuRef,
    onFavorite,
    onEditFolder,
    onCopy,
    onEleminate,
    onRepair,
    isLineList,
    // onShare,
    // onMove,
}) => {
    useEffect(() => {
        animateFileActionMenu(menuRef, true);
    }, [menuRef]);
    return (
        <div className={isLineList ? styles.actionMenu_line : styles.actionMenu} ref={menuRef}>
            {onFavorite && (
                <button
                    className={styles.actionMenu__button}
                    onClick={e => {
                        e.stopPropagation();
                    }}
                >
                    <svg
                        width={size}
                        height={size}
                        viewBox='0 0 15 14'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M13.0251 1.88117C12.7059 1.5618 12.3268 1.30845 11.9097 1.1356C11.4925 0.962746 11.0454 0.873779 10.5938 0.873779C10.1423 0.873779 9.69514 0.962746 9.27798 1.1356C8.86082 1.30845 8.4818 1.5618 8.16257 1.88117L7.50007 2.54367L6.83757 1.88117C6.19277 1.23636 5.31822 0.874114 4.40632 0.874114C3.49443 0.874114 2.61988 1.23636 1.97507 1.88117C1.33027 2.52598 0.968018 3.40052 0.968018 4.31242C0.968018 5.22432 1.33027 6.09886 1.97507 6.74367L7.50007 12.2687L13.0251 6.74367C13.3444 6.42445 13.5978 6.04543 13.7706 5.62827C13.9435 5.21111 14.0325 4.76397 14.0325 4.31242C14.0325 3.86087 13.9435 3.41374 13.7706 2.99657C13.5978 2.57941 13.3444 2.20039 13.0251 1.88117Z'
                            stroke='currentColor'
                            strokeWidth='1.4'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                        />
                    </svg>
                    Избранное
                </button>
            )}
            {onDownload && (
                <button
                    className={styles.actionMenu__button}
                    onClick={e => {
                        e.stopPropagation();
                        onDownload();
                    }}
                >
                    <svg
                        width={size}
                        height={size}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 24 24'
                    >
                        <g
                            fill='none'
                            stroke='currentColor'
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            strokeWidth='2'
                        >
                            <path d='M12 22v-9m0 9l-2.5-2m2.5 2l2.5-2M5.034 9.117A4.002 4.002 0 0 0 6 17h1' />
                            <path d='M15.83 7.138a5.5 5.5 0 0 0-10.796 1.98S5.187 10 5.5 10.5' />
                            <path d='M17 17a5 5 0 1 0-1.17-9.862L14.5 7.5' />
                        </g>
                    </svg>
                    Скачать
                </button>
            )}
            {onCopy && (
                <button className={styles.actionMenu__button} onClick={() => onCopy()}>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={size}
                        height={size}
                        viewBox='0 0 16 16'
                    >
                        <path
                            fill='currentColor'
                            fillRule='evenodd'
                            d='M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z'
                        />
                    </svg>
                    Создать копию
                </button>
            )}
            {onEditFolder && (
                <button
                    className={styles.actionMenu__button}
                    onClick={e => {
                        e.stopPropagation();
                        onEditFolder();
                    }}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={size}
                        height={size}
                        viewBox='0 -960 960 960'
                        fill='currentColor'
                    >
                        <path d='M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z' />
                    </svg>
                    Изменить
                </button>
            )}
            {onDelete && (
                <button
                    className={styles.actionMenu__button}
                    onClick={e => {
                        e.stopPropagation();
                        onDelete();
                    }}
                >
                    <svg
                        width={size}
                        height={size}
                        xmlns='http://www.w3.org/2000/svg'
                        viewBox='0 0 1024 1024'
                    >
                        <path
                            fill='currentColor'
                            fillOpacity='.15'
                            d='M292.7 840h438.6l24.2-512h-487z'
                        />
                        <path
                            fill='currentColor'
                            d='M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32m-504-72h304v72H360zm371.3 656H292.7l-24.2-512h487z'
                        />
                    </svg>
                    В корзину
                </button>
            )}
            {onRepair && (
                <button
                    className={styles.actionMenu__button}
                    onClick={e => {
                        e.stopPropagation();
                        onRepair();
                    }}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={size}
                        height={size}
                        viewBox='0 0 16 16'
                    >
                        <path
                            fill='currentColor'
                            d='M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1z'
                        />
                    </svg>
                    Восстановить
                </button>
            )}
            {onEleminate && (
                <button
                    className={styles.actionMenu__button}
                    onClick={e => {
                        e.stopPropagation();
                        onEleminate();
                    }}
                >
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width={size}
                        height={size}
                        viewBox='0 0 16 16'
                    >
                        <path
                            fill='currentColor'
                            d='M8.086 2.207a2 2 0 0 1 2.828 0l3.879 3.879a2 2 0 0 1 0 2.828l-5.5 5.5A2 2 0 0 1 7.879 15H5.12a2 2 0 0 1-1.414-.586l-2.5-2.5a2 2 0 0 1 0-2.828zm2.121.707a1 1 0 0 0-1.414 0L4.16 7.547l5.293 5.293l4.633-4.633a1 1 0 0 0 0-1.414zM8.746 13.547L3.453 8.254L1.914 9.793a1 1 0 0 0 0 1.414l2.5 2.5a1 1 0 0 0 .707.293H7.88a1 1 0 0 0 .707-.293z'
                        />
                    </svg>
                    Стереть
                </button>
            )}
        </div>
    );
};
