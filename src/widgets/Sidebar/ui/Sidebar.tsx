import { uploadFile } from '@shared/api/Files';
import { queryClient } from '@shared/api/queryClient';
import { useAppSelectot } from '@app/store/config/store';
import { rootFolderHistory } from '@/shared/config/app/rootFolder';
import { useClickOutside } from '@/shared/hooks/state/useClickOutside';
import { usePathfinder } from '@/shared/hooks/usePathFinder';
import { animatePanel } from '@shared/lib/animations';
import { useMutation } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from './Sidebar.module.scss';
import { Load } from '@shared/ui/Loader/ui/Load';
import { FILTERS } from '@/shared/config/routes/filters';
import { FolderFormModal } from '@/features/folderManagement';

export const Sidebar = () => {
    const [isPanelVisible, setIsPanelVisible] = useState(false);
    const [createModal, setCreateModal] = useState(false);
    const filter = useAppSelectot(state => state.filter);
    const navigate = useNavigate();
    const folderId = usePathfinder();
    const size = 20;

    const dispatch = useDispatch();

    const toggleFilter = (filterState: string) => {
        dispatch({
            type: filterState,
            payload: { filter: filterState },
        });
        // setFilter(filterState);
        queryClient.invalidateQueries({ queryKey: [`${filterState}`] });
        localStorage.setItem('folderHistory', JSON.stringify(rootFolderHistory));
        if (filterState === 'home') {
            navigate('/my-drive');
        } else {
            navigate(`/my-drive/${filterState}`);
        }
    };

    const closeMenu = () => {
        setIsPanelVisible(false);
    };

    const menuRef = useClickOutside(closeMenu);

    const togglePanel = () => {
        setIsPanelVisible(!isPanelVisible);
    };

    useEffect(() => {
        animatePanel(menuRef, isPanelVisible);
    }, [isPanelVisible, menuRef]);

    const openModal = () => {
        setCreateModal(true);
        setIsPanelVisible(false);
    };

    const closeModal = () => {
        setCreateModal(false);
    };

    const uploadMutation = useMutation({
        mutationFn: (file: File) => uploadFile(file, folderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folders', folderId] });
        },
        onError: (error: Error) => {
            console.error(error);
        },
    });

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsPanelVisible(false);
        const fileList = e.target.files;
        if (!fileList) {
            console.error('No file selected');
            return;
        }

        const fileArray = Array.from(fileList);

        for (const file of fileArray) {
            try {
                await uploadMutation.mutateAsync(file);
            } catch (error) {
                console.error('Ошибка загрузки файла:', error);
            }
        }
    };

    return (
        <div className={styles.filters}>
            {uploadMutation.status === 'pending' && (
                <Load
                    type='box-rotate-z'
                    bgColor={'black'}
                    color={'black'}
                    title={'Загрузка...'}
                    size={100}
                />
            )}
            <div className={styles.filters__up}>
                <div className={styles.create__container}>
                    <button className={styles.create__button} onClick={togglePanel}>
                        <svg
                            width='21'
                            height='21'
                            viewBox='0 0 21 21'
                            fill='none'
                            xmlns='http://www.w3.org/2000/svg'
                        >
                            <path
                                fillRule='evenodd'
                                clipRule='evenodd'
                                d='M8.59195 21H12.4101V12.4095H21V8.59127H12.4101V0H8.59195V8.59127H0V12.4095H8.59195V21Z'
                                fill='white'
                            />
                        </svg>
                    </button>
                    {isPanelVisible && (
                        <div className={styles.create__panel} ref={menuRef}>
                            <button
                                className={styles.create__file}
                                onClick={() => document.getElementById('fileInput')?.click()}
                            >
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 20 20'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M17.5 12.5V15.8333C17.5 16.2754 17.3244 16.6993 17.0118 17.0118C16.6993 17.3244 16.2754 17.5 15.8333 17.5H4.16667C3.72464 17.5 3.30072 17.3244 2.98816 17.0118C2.67559 16.6993 2.5 16.2754 2.5 15.8333V12.5M14.1667 6.66667L10 2.5M10 2.5L5.83333 6.66667M10 2.5V12.5'
                                        stroke='#7B7F9E'
                                        strokeWidth='2.5'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </button>
                            <input
                                id='fileInput'
                                type='file'
                                multiple
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                            />
                            <button className={styles.create__folder} onClick={openModal}>
                                <svg
                                    width='20'
                                    height='20'
                                    viewBox='0 0 20 20'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        d='M18.3334 15.8333C18.3334 16.2754 18.1578 16.6993 17.8453 17.0118C17.5327 17.3244 17.1088 17.5 16.6667 17.5H3.33341C2.89139 17.5 2.46746 17.3244 2.1549 17.0118C1.84234 16.6993 1.66675 16.2754 1.66675 15.8333V4.16667C1.66675 3.72464 1.84234 3.30072 2.1549 2.98816C2.46746 2.67559 2.89139 2.5 3.33341 2.5H7.50008L9.16675 5H16.6667C17.1088 5 17.5327 5.17559 17.8453 5.48816C18.1578 5.80072 18.3334 6.22464 18.3334 6.66667V15.8333Z'
                                        stroke='#7B7F9E'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
                <ul className={styles.filters__list}>
                    <li className={styles.filters__item}>
                        <button
                            onClick={() => toggleFilter(FILTERS.HOME)}
                            className={styles.filters__button}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width={size}
                                height={size}
                                viewBox='0 0 16 16'
                            >
                                <path
                                    fill='currentColor'
                                    d='M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z'
                                />
                            </svg>
                            <span className={styles.filters__title}>Мой диск</span>
                        </button>
                    </li>
                    <li className={styles.filters__item}>
                        <button
                            onClick={() => toggleFilter(FILTERS.SHARED)}
                            className={`${styles.filters__button} ${
                                filter === FILTERS.SHARED ? styles.filters__button_active : ''
                            }`}
                        >
                            <svg
                                width={size}
                                height={size}
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M15 18.3334C14.3056 18.3334 13.7153 18.0903 13.2292 17.6042C12.7431 17.1181 12.5 16.5278 12.5 15.8334C12.5 15.7361 12.5069 15.6354 12.5208 15.5313C12.5347 15.4271 12.5556 15.3334 12.5833 15.25L6.70833 11.8334C6.47222 12.0417 6.20833 12.2049 5.91667 12.3229C5.625 12.441 5.31944 12.5 5 12.5C4.30556 12.5 3.71528 12.257 3.22917 11.7709C2.74306 11.2847 2.5 10.6945 2.5 10C2.5 9.30558 2.74306 8.7153 3.22917 8.22919C3.71528 7.74308 4.30556 7.50002 5 7.50002C5.31944 7.50002 5.625 7.55905 5.91667 7.6771C6.20833 7.79516 6.47222 7.95835 6.70833 8.16669L12.5833 4.75002C12.5556 4.66669 12.5347 4.57294 12.5208 4.46877C12.5069 4.3646 12.5 4.26391 12.5 4.16669C12.5 3.47224 12.7431 2.88196 13.2292 2.39585C13.7153 1.90974 14.3056 1.66669 15 1.66669C15.6944 1.66669 16.2847 1.90974 16.7708 2.39585C17.2569 2.88196 17.5 3.47224 17.5 4.16669C17.5 4.86113 17.2569 5.45141 16.7708 5.93752C16.2847 6.42363 15.6944 6.66669 15 6.66669C14.6806 6.66669 14.375 6.60766 14.0833 6.4896C13.7917 6.37155 13.5278 6.20835 13.2917 6.00002L7.41667 9.41669C7.44444 9.50002 7.46528 9.59377 7.47917 9.69794C7.49306 9.8021 7.5 9.9028 7.5 10C7.5 10.0972 7.49306 10.1979 7.47917 10.3021C7.46528 10.4063 7.44444 10.5 7.41667 10.5834L13.2917 14C13.5278 13.7917 13.7917 13.6285 14.0833 13.5104C14.375 13.3924 14.6806 13.3334 15 13.3334C15.6944 13.3334 16.2847 13.5764 16.7708 14.0625C17.2569 14.5486 17.5 15.1389 17.5 15.8334C17.5 16.5278 17.2569 17.1181 16.7708 17.6042C16.2847 18.0903 15.6944 18.3334 15 18.3334ZM15 5.00002C15.2361 5.00002 15.434 4.92016 15.5938 4.76044C15.7535 4.60072 15.8333 4.4028 15.8333 4.16669C15.8333 3.93058 15.7535 3.73266 15.5938 3.57294C15.434 3.41321 15.2361 3.33335 15 3.33335C14.7639 3.33335 14.566 3.41321 14.4063 3.57294C14.2465 3.73266 14.1667 3.93058 14.1667 4.16669C14.1667 4.4028 14.2465 4.60072 14.4063 4.76044C14.566 4.92016 14.7639 5.00002 15 5.00002ZM5 10.8334C5.23611 10.8334 5.43403 10.7535 5.59375 10.5938C5.75347 10.434 5.83333 10.2361 5.83333 10C5.83333 9.76391 5.75347 9.56599 5.59375 9.40627C5.43403 9.24655 5.23611 9.16669 5 9.16669C4.76389 9.16669 4.56597 9.24655 4.40625 9.40627C4.24653 9.56599 4.16667 9.76391 4.16667 10C4.16667 10.2361 4.24653 10.434 4.40625 10.5938C4.56597 10.7535 4.76389 10.8334 5 10.8334ZM15 16.6667C15.2361 16.6667 15.434 16.5868 15.5938 16.4271C15.7535 16.2674 15.8333 16.0695 15.8333 15.8334C15.8333 15.5972 15.7535 15.3993 15.5938 15.2396C15.434 15.0799 15.2361 15 15 15C14.7639 15 14.566 15.0799 14.4063 15.2396C14.2465 15.3993 14.1667 15.5972 14.1667 15.8334C14.1667 16.0695 14.2465 16.2674 14.4063 16.4271C14.566 16.5868 14.7639 16.6667 15 16.6667Z'
                                    fill='#1D1B20'
                                />
                            </svg>
                            <span className={styles.filters__title}>Общее</span>
                        </button>
                    </li>
                    <li className={styles.filters__item}>
                        <button
                            onClick={() => toggleFilter(FILTERS.FAV)}
                            className={`${styles.filters__button} ${
                                filter === FILTERS.FAV ? styles.filters__button_active : ''
                            }`}
                        >
                            <svg
                                width={size}
                                height={size}
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    d='M17.3667 3.84166C16.941 3.41583 16.4357 3.07803 15.8795 2.84757C15.3232 2.6171 14.7271 2.49847 14.125 2.49847C13.5229 2.49847 12.9268 2.6171 12.3705 2.84757C11.8143 3.07803 11.309 3.41583 10.8833 3.84166L10 4.725L9.11667 3.84166C8.25692 2.98192 7.09086 2.49892 5.875 2.49892C4.65914 2.49892 3.49307 2.98192 2.63333 3.84166C1.77359 4.70141 1.29059 5.86747 1.29059 7.08333C1.29059 8.29919 1.77359 9.46525 2.63333 10.325L10 17.6917L17.3667 10.325C17.7925 9.89937 18.1303 9.39401 18.3608 8.83779C18.5912 8.28158 18.7099 7.6854 18.7099 7.08333C18.7099 6.48126 18.5912 5.88508 18.3608 5.32887C18.1303 4.77265 17.7925 4.26729 17.3667 3.84166Z'
                                    stroke='#1E1E1E'
                                    strokeWidth='1.6'
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                />
                            </svg>
                            <span className={styles.filters__title}>Избранное</span>
                        </button>
                    </li>
                    <li className={styles.filters__item}>
                        <button
                            onClick={() => toggleFilter(FILTERS.RECENT)}
                            className={`${styles.filters__button} ${
                                filter === FILTERS.RECENT ? styles.filters__button_active : ''
                            }`}
                        >
                            <svg
                                width={size}
                                height={size}
                                viewBox='0 0 20 20'
                                fill='none'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <g clipPath='url(#clip0_54665_587)'>
                                    <path
                                        d='M10 5.00002V10L13.3334 11.6667M18.3334 10C18.3334 14.6024 14.6024 18.3334 10 18.3334C5.39765 18.3334 1.66669 14.6024 1.66669 10C1.66669 5.39765 5.39765 1.66669 10 1.66669C14.6024 1.66669 18.3334 5.39765 18.3334 10Z'
                                        stroke='#1E1E1E'
                                        strokeWidth='2'
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                    />
                                </g>
                                <defs>
                                    <clipPath id='clip0_54665_587'>
                                        <rect width='20' height='20' fill='white' />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span className={styles.filters__title}>Недавнее</span>
                        </button>
                    </li>
                    <li className={styles.filters__item}>
                        <button
                            onClick={() => toggleFilter(FILTERS.TRASH)}
                            className={`${styles.filters__button} ${
                                filter === FILTERS.TRASH ? styles.filters__button_active : ''
                            }`}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                width={size}
                                height={size}
                                viewBox='0 0 16 16'
                            >
                                <g fill='currentColor'>
                                    <path d='M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z' />
                                    <path d='M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z' />
                                </g>
                            </svg>
                            <span className={styles.filters__title}>Корзина</span>
                        </button>
                    </li>
                </ul>
            </div>
            {createModal && <FolderFormModal mode='create' onClose={closeModal} />}
        </div>
    );
};
