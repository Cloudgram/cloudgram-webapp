import { useGetSearchResultsQuery } from '@/shared/api/appApi';
import styles from './SearchInput.module.scss';
import { useEffect, useState } from 'react';
import { FolderIconSmall } from '@/shared/assets/icons/all/FolderIconSmall';
import { FileIcon } from '@/shared/assets/icons/all/FileIcon';
import { SearchItem } from './SearchItem';
import { Spinner } from '@chakra-ui/react';

interface SearchInputProps {
    isOpen: boolean;
    className?: string;
}

export const SearchResult = ({ isOpen, className }: SearchInputProps) => {
    const { data: searchData, isLoading } = useGetSearchResultsQuery({
        files: true,
        folders: true,
    });
    const [files, setFiles] = useState<{ id: string; title: string }[]>();
    const [folders, setFolders] = useState<{ id: string; title: string }[]>();

    useEffect(() => {
        if (searchData) {
            const foundFiles = searchData
                .filter(el => el.fs_type === 'file')
                .map(el => ({ id: el.id, title: el.title }));
            const foundFolders = searchData
                .filter(el => el.fs_type === 'folder')
                .map(el => ({ id: el.id, title: el.title }));
            setFiles(foundFiles);
            setFolders(foundFolders);
        }
    }, [searchData]);

    return (
        <div
            className={`${styles['search-results']} ${className}`}
            style={isOpen ? { opacity: 1, display: 'block' } : { opacity: 0, visibility: 'hidden' }}
            onMouseDown={e => e.preventDefault()}
        >
            {isLoading ? (
                <Spinner />
            ) : (
                <div className={styles.container}>
                    {searchData && folders ? (
                        <SearchItem
                            icon={<FolderIconSmall color='#a6a6a6' />}
                            title='Папки'
                            items={folders}
                        />
                    ) : null}
                    {searchData && files ? (
                        <SearchItem icon={<FileIcon />} title='Файлы' items={files} />
                    ) : null}
                </div>
            )}
        </div>
    );
};
