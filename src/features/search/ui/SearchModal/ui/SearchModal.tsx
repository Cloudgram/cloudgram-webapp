import { useSearchList } from '@shared/hooks/queries/useSearchList';
import styles from './SearchModal.module.scss';
import { useEffect, useState } from 'react';
import { getFolders } from '@shared/api/Folders';
import { queryClient } from '@shared/api/queryClient';
import { useNavigate } from 'react-router-dom';
import { getFileColor, getFileIcon } from '@shared/lib';
import { Load } from '@shared/ui/Loader';
import { SearchListType } from '@/shared/types/SearchListType';
import { ROUTES } from '@/shared/config/routes/routes';

interface SearchModalProps {
    searchQuery: string;
    onClose: () => void;
    isOpen: boolean;
}

export const SearchModal = ({ searchQuery, onClose, isOpen }: SearchModalProps) => {
    const [searchItems, setSearchItems] = useState<SearchListType['data']>([]);
    const { data, isPending } = useSearchList(isOpen);
    const navigate = useNavigate();
    const sizeIconEntity = 40;

    useEffect(() => {
        if (data?.success) {
            setSearchItems(data.data);
        } else {
            setSearchItems([]);
        }
    }, [data]);

    const filteredItems =
        searchItems.filter(item => {
            const searchLower = searchQuery.toLowerCase();
            if (!item) return false;
            if (item.fs_type === 'folder') {
                return item.title.toLowerCase().includes(searchLower);
            }
            return (
                item.title.toLowerCase().includes(searchLower) ||
                item.extension.toLowerCase().includes(searchLower)
            );
        }) ?? [];

    const handleFolderDoubleClick = async (e: React.MouseEvent, link: string) => {
        e.preventDefault();

        await queryClient.prefetchQuery({
            queryKey: ['folders', link.split('/')[2]],
            queryFn: () => getFolders(link.split('/')[2]),
        });
        if (link === null) navigate(ROUTES.MY_DRIVE);
        navigate(link);
        onClose();
    };

    return (
        <div className={styles.search__container}>
            {isPending ? (
                <Load
                    className={styles.search__loader}
                    type='box-rotate-z'
                    bgColor='black'
                    color='black'
                    size={100}
                    title='Загрузка...'
                />
            ) : filteredItems.length === 0 ? (
                <div className={styles.search__empty}>Нет результатов</div>
            ) : (
                <ul className={styles.search__list}>
                    {filteredItems.map((searchItem, index) =>
                        searchItem.fs_type === 'folder' ? (
                            <li
                                onDoubleClick={e =>
                                    handleFolderDoubleClick(e, `/folder/${searchItem.id}`)
                                }
                                key={index}
                                className={styles.search__item}
                            >
                                <div className={styles.search__folder}>
                                    <svg
                                        width={sizeIconEntity}
                                        height={sizeIconEntity}
                                        viewBox='0 0 36 28'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                    >
                                        <path
                                            d='M30.211 5.01054e-06H5.15799C3.12814 -0.00331084 1.47988 1.63955 1.47657 3.66947C1.47629 3.83464 1.48714 3.99961 1.5091 4.16326C1.56133 4.56682 1.93084 4.85164 2.33447 4.79942C2.43278 4.78671 2.52748 4.75431 2.61294 4.70409C2.93803 4.51495 3.30823 4.4172 3.6843 4.42113H8.93073C9.87754 4.42376 10.7187 5.02593 11.0263 5.92135L11.1516 6.32512C11.6586 7.82603 13.0645 8.83791 14.6487 8.84219H31.6848C32.0712 8.84254 32.4507 8.94416 32.7856 9.13696C32.8988 9.20293 33.0275 9.23747 33.1585 9.2372C33.5654 9.2372 33.8953 8.90727 33.8953 8.50032V3.68426C33.8953 1.6495 32.2458 5.01054e-06 30.211 5.01054e-06Z'
                                            fill={searchItem.color.back_hex}
                                        />
                                        <path
                                            d='M33.5313 7.86638C32.9708 7.5397 32.3335 7.36783 31.6847 7.36825H14.6487C13.7018 7.36562 12.8607 6.76345 12.553 5.86803L12.4278 5.46426C11.9207 3.96336 10.5149 2.95147 8.93068 2.94719H3.68425C3.05113 2.94104 2.4281 3.10545 1.88043 3.42322C0.718986 4.07319 -0.000345276 5.3004 1.24332e-07 6.63144V24.316C1.24332e-07 26.3507 1.6495 28.0002 3.68425 28.0002H31.6847C33.7195 28.0002 35.369 26.3507 35.369 24.316V11.0526C35.3735 9.73742 34.672 8.52106 33.5313 7.86638Z'
                                            fill={searchItem.color.hex}
                                        />
                                    </svg>
                                    <div className={styles.search__folder__metadata}>
                                        <div className={styles.search__folder__title}>
                                            <h3>{searchItem.title}</h3>
                                            <p>
                                                {searchItem.views}
                                                views
                                            </p>
                                        </div>
                                        <div className={styles.search__folder__date}>
                                            <p>
                                                {new Date(searchItem.created_at).toLocaleDateString(
                                                    'ru-RU',
                                                    {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric',
                                                    }
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ) : (
                            <li
                                style={{
                                    color: getFileColor(searchItem.extension)?.color || '',
                                }}
                                onDoubleClick={e =>
                                    handleFolderDoubleClick(e, `/folder/${searchItem.folder_id}`)
                                }
                                key={index}
                                className={styles.search__item}
                            >
                                <div className={styles.search__folder}>
                                    {getFileIcon(searchItem.extension)}
                                    <div className={styles.search__folder__metadata}>
                                        <div className={styles.search__folder__title}>
                                            <h3 className={styles.search__folder__name}>
                                                <span>{searchItem.title}</span>.
                                                {searchItem.extension}
                                            </h3>
                                            <p>{searchItem.views} views</p>
                                        </div>
                                        <div className={styles.search__folder__date}>
                                            <p>
                                                {new Date(searchItem.created_at).toLocaleDateString(
                                                    'ru-RU',
                                                    {
                                                        year: 'numeric',
                                                        month: 'numeric',
                                                        day: 'numeric',
                                                    }
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        )
                    )}
                </ul>
            )}
        </div>
    );
};
