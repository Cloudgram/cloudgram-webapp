import { FolderCard } from '@/entities/folder/ui/FolderCard';
import styles from './FileExplorer.module.scss';
import { useGetFolderQuery } from '@/shared/api/appApi';
import { Box, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { queryStateHelper } from '@/shared/lib/queryStateHelper';
import { FileCard } from '@/entities/file/ui/FileCard';
import { createFolderMenuActions } from '@/features/folder/createFolderMenuActions';

interface FileExplorerProps {
    viewMode?: 'grid' | 'list';
}

export const FileExplorer = ({ viewMode }: FileExplorerProps) => {
    const navigate = useNavigate();
    const { data: folderData, isLoading, isFetching } = useGetFolderQuery({ folderID: 'root' });
    const loadingState = queryStateHelper(isLoading, isFetching);

    return (
        <div className={styles.fileExplorer}>
            {loadingState ? (
                <Box
                    className={styles.folderViewer__spinnerBox}
                    height={'100%'}
                    margin={'0 auto'}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                    mt={'100px'}
                >
                    <Spinner color='teal.500' size='xl' />
                </Box>
            ) : (
                <Box
                    as={'ul'}
                    className={
                        viewMode === 'grid' ? styles.fileExplorer__grid : styles.fileExplorer__list
                    }
                >
                    {folderData?.folders.map(folder => (
                        <li
                            className={
                                viewMode === 'grid'
                                    ? styles.fileExplorer__item
                                    : styles.fileExplorer__item__list
                            }
                            key={folder.id}
                        >
                            <FolderCard
                                key={folder.id}
                                onDoubleClick={() => navigate(`/folder/${folder.id}`)}
                                folderData={folder}
                                viewMode={viewMode ?? 'grid'}
                                menuActions={createFolderMenuActions(folder.id)}
                            />
                        </li>
                    ))}
                    {folderData?.files.map(file => (
                        <li
                            className={
                                viewMode === 'grid'
                                    ? styles.fileExplorer__item
                                    : styles.fileExplorer__item__list
                            }
                            key={file.id}
                        >
                            <FileCard fileData={file} viewMode={viewMode ?? 'grid'} />
                        </li>
                    ))}
                </Box>
            )}
        </div>
    );
};
