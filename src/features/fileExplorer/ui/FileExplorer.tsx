import { FolderCard } from '@/entities/folder/ui/FolderCard';
import styles from './FileExplorer.module.scss';
import { useGetFolderQuery } from '@/shared/api/appApi';
import { Box, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { queryStateHelper } from '@/shared/lib/queryStateHelper';

interface FileExplorerProps {
    viewMode?: 'grid' | 'list';
}

export const FileExplorer = ({ viewMode }: FileExplorerProps) => {
    const navigate = useNavigate();
    const { data: folderData, isLoading, isFetching } = useGetFolderQuery({ folderID: 'root' });
    const loadingState = queryStateHelper(isLoading, isFetching);

    return (
        <>
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
                <div
                    className={
                        viewMode === 'grid' ? styles.fileExplorer__grid : styles.fileExplorer__list
                    }
                >
                    {folderData?.folders.map(folder => (
                        <div
                            className={
                                viewMode === 'grid'
                                    ? styles.fileExplorer__item
                                    : styles.fileExplorer__item__list
                            }
                            key={folder.id}
                        >
                            <FolderCard
                                onDoubleClick={() => navigate(`/folder/${folder.id}`)}
                                key={folder.id}
                                folderData={folder}
                            />
                        </div>
                    ))}
                </div>
            )}
        </>
    );
};
