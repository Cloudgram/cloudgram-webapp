import type { RootFolderType } from '@/entities/folder/model/folderSchema';
import styles from './FolderViewer.module.scss';
import { ViewToggle } from '@/features/viewMode/ui/ViewToggle';
import { useAppDispatch } from '@shared/hooks/useRedux';
import { setViewMode } from '@features/viewMode/model/viewModeSlice';
import type { ViewSection } from '@/features/viewMode/model/viewMode.types';
import { Box } from '@chakra-ui/react';

interface FileListViewerProps {
    filesArray: RootFolderType['files'];
    viewMode: 'grid' | 'list';
    section: ViewSection;
}

export const FileListViewer = ({ filesArray, viewMode, section }: FileListViewerProps) => {
    const dispatch = useAppDispatch();

    return (
        <div className={styles.folderViewer__files__container}>
            <Box className={styles.folderViewer__header}>
                <h3 className={styles.folderViewer__header__title}>Files</h3>
                <ViewToggle
                    value={viewMode}
                    onChange={mode => dispatch(setViewMode({ section, mode }))}
                />
            </Box>
            <Box
                as={'ul'}
                className={
                    viewMode === 'grid'
                        ? styles.folderViewer__files__grid
                        : styles.folderViewer__files__list
                }
            >
                {filesArray.map(file => (
                    <li
                        className={
                            viewMode === 'grid'
                                ? styles.folderViewer__item
                                : styles.folderViewer__item__list
                        }
                        key={file.id}
                    >
                        {file.title}
                        {/* <FolderCard key={file.id} folderData={file} /> */}
                    </li>
                ))}
            </Box>
        </div>
    );
};
