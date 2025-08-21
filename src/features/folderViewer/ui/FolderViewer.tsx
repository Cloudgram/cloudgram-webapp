import { useParams } from 'react-router-dom';
import styles from './FolderViewer.module.scss';
import { useGetFolderQuery } from '@shared/api/appApi';
import { FolderTitle } from './FolderTitle';
import { FolderListViewer } from './FolderListViewer';
import { selectViewModeBySection } from '@features/viewMode/model/selectors';
import { useAppSelector } from '@shared/hooks/useRedux';
import { FileListViewer } from './FileListViewer';
import { BackButton } from './BackButton';
import { Box, Spinner } from '@chakra-ui/react';
import { queryStateHelper } from '@/shared/lib/queryStateHelper';

export const FolderViewer = () => {
    const foldersSection = 'folderViewerFolders' as const;
    const filesSection = 'folderViewerFiles' as const;
    const { currentFolderID } = useParams<{ currentFolderID: string }>();
    const {
        data: folderData,
        isLoading,
        isFetching,
    } = useGetFolderQuery({
        folderID: currentFolderID || 'root',
    });
    const viewModeFolders = useAppSelector(selectViewModeBySection(foldersSection));
    const viewModeFiles = useAppSelector(selectViewModeBySection(filesSection));
    const loadingState = queryStateHelper(isLoading, isFetching);

    return (
        <div className={styles.folderViewer}>
            {loadingState ? (
                <Box
                    className={styles.folderViewer__spinnerBox}
                    height={'100%'}
                    margin={'0 auto'}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Spinner color='teal.500' size='xl' />
                </Box>
            ) : (
                <>
                    <BackButton />
                    <FolderTitle title={folderData?.title || 'Unknown'} />
                    {folderData?.folders && folderData.folders.length > 0 && (
                        <FolderListViewer
                            section={foldersSection}
                            viewMode={viewModeFolders}
                            foldersArray={folderData?.folders || []}
                        />
                    )}
                    {folderData?.files && folderData.files.length > 0 && (
                        <FileListViewer
                            section={filesSection}
                            viewMode={viewModeFiles}
                            filesArray={folderData?.files || []}
                        />
                    )}
                </>
            )}
        </div>
    );
};
