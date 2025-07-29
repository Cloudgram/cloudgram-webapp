import { FolderCard } from '@/entities/folder/ui/FolderCard';
import styles from './FileExplorer.module.scss';
import { useGetFolderQuery } from '@/shared/api/appApi';
import { Grid, GridItem } from '@chakra-ui/react';

export const FileExplorer = () => {
    const { data: folderData } = useGetFolderQuery({ folderID: 'root' });

    return (
        <Grid className={styles.fileExplorer} templateColumns='repeat(4, 1fr)' gap={6}>
            {Array.isArray(folderData?.folders) &&
                folderData.folders.map(folder => (
                    <GridItem className={styles.fileExplorer__item} key={folder.id}>
                        <FolderCard key={folder.id} folderData={folder} />
                    </GridItem>
                ))}
        </Grid>
    );
};
