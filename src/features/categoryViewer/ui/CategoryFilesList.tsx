import styles from './CategoryViewer.module.scss';
import { FileCard } from '@entities/file/ui/FileCard';
import type { ViewSection } from '@features/viewMode/model/viewMode.types';
import type { FileType } from '@entities/file/model/fileShema';
import { getFilteredCategoryFiles } from '../model/useFilterCategoryFiles';
import { Box } from '@chakra-ui/react';
import { ViewToggle } from '@features/viewMode/ui/ViewToggle';
import { setViewMode } from '@features/viewMode/model/viewModeSlice';
import { useAppDispatch } from '@shared/hooks/useRedux';

interface CategoryFilesListProps {
    category: {
        route: string | undefined;
        label: string | undefined;
    };
    categoryFiles: FileType[] | undefined;
    viewMode: 'grid' | 'list';
    section: ViewSection;
}

export const CategoryFilesList = ({
    category,
    viewMode,
    section,
    categoryFiles,
}: CategoryFilesListProps) => {
    const dispatch = useAppDispatch();

    const filteredFilesList = getFilteredCategoryFiles(category.route || '', categoryFiles || []);

    return (
        <div className={styles.categoryViewer__container}>
            <Box className={styles.categoryViewer__header}>
                <h3 className={styles.categoryViewer__header__title}>{category.label}</h3>
                <ViewToggle
                    value={viewMode}
                    onChange={mode => dispatch(setViewMode({ section, mode }))}
                />
            </Box>

            <Box
                as={'ul'}
                className={
                    viewMode === 'grid'
                        ? styles.categoryViewer__list__grid
                        : styles.categoryViewer__list__list
                }
            >
                {filteredFilesList?.map(file => (
                    <li
                        className={
                            viewMode === 'grid'
                                ? styles.categoryViewer__item
                                : styles.categoryViewer__item__list
                        }
                        key={file.id}
                    >
                        <FileCard fileData={file} viewMode={viewMode ?? 'grid'} />
                    </li>
                ))}
            </Box>
        </div>
    );
};
