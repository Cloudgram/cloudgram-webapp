import { useCurrentSectionLabel } from '@shared/hooks/useCurrentSectionLabel';
import { CategoryFilesList } from './CategoryFilesList';
import styles from './CategoryViewer.module.scss';
import { useGetAllFilesQuery } from '@shared/api/appApi';
import { queryStateHelper } from '@shared/lib/queryStateHelper';
import { Box, Spinner } from '@chakra-ui/react';
import { selectViewModeBySection } from '@features/viewMode/model/selectors';
import { useAppSelector } from '@shared/hooks/useRedux';

export const CategoryViewer = () => {
    const pageTitle = useCurrentSectionLabel();
    const { data: categoryData, isLoading, isFetching } = useGetAllFilesQuery({ files: true });

    const categorySection = 'categoryViewerFiles' as const;
    const viewModeCategories = useAppSelector(selectViewModeBySection(categorySection));
    const loadingState = queryStateHelper(isLoading, isFetching);

    return (
        <div className={styles.categoryViewer}>
            {loadingState ? (
                <Box
                    className={styles.folderViewer__spinnerBox}
                    height={'80vh'}
                    margin={'0 auto'}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    <Spinner color='teal.500' size='xl' />
                </Box>
            ) : (
                <CategoryFilesList
                    category={{ route: pageTitle?.route, label: pageTitle?.label }}
                    categoryFiles={categoryData}
                    viewMode={viewModeCategories}
                    section={categorySection}
                />
            )}
        </div>
    );
};
