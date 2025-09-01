import { useGetSearchResultsQuery } from '@shared/api/appApi';
import styles from './Search.module.scss';
import { useMemo } from 'react';
import { FolderIconSmall } from '@shared/assets/icons/all/FolderIconSmall';
import { SearchItem } from './SearchItem';
import { Spinner } from '@chakra-ui/react';
import { DocumentsIcon } from '@/shared/assets/icons/all/DocumentsIcon';

interface SearchInputProps {
    className?: string;
    value: string;
}

export const SearchResult = ({ className, value }: SearchInputProps) => {
    const { data: searchData, isLoading } = useGetSearchResultsQuery({
        files: true,
        folders: true,
    });

    const files = useMemo(
        () =>
            searchData?.filter(
                item =>
                    item.fs_type === 'file' &&
                    item.title.toLowerCase().includes(value.toLowerCase())
            ) ?? [],
        [searchData, value]
    );

    const folders = useMemo(
        () =>
            searchData?.filter(
                item =>
                    item.fs_type === 'folder' &&
                    item.title.toLowerCase().includes(value.toLowerCase())
            ) ?? [],
        [searchData, value]
    );

    return (
        <div
            className={`${styles.searchResults} ${className ?? ''}`}
            onMouseDown={e => e.preventDefault()}
        >
            {isLoading ? (
                <div className={styles.searchResults__loading}>
                    <Spinner color='teal.500' size='xl' />
                </div>
            ) : (
                <div className={styles.searchResults__container}>
                    {folders?.length > 0 || files?.length > 0 ? (
                        <>
                            {folders && (
                                <SearchItem
                                    icon={<FolderIconSmall color='#a6a6a6' />}
                                    title='Folders'
                                    items={folders}
                                />
                            )}
                            {files && (
                                <SearchItem icon={<DocumentsIcon />} title='Files' items={files} />
                            )}
                        </>
                    ) : (
                        <div className={styles.searchResults__loading}>
                            <h1>No results</h1>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
