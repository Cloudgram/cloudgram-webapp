import { DocumentsIcon } from '@/shared/assets/icons/all/DocumentsIcon';
import { Box, Button } from '@chakra-ui/react';
import styles from './UploadFileButton.module.scss';
import {
    appApi,
    useInitFileUploadMutation,
    useUploadFileChunkMutation,
    useUploadFilePreviewMutation,
} from '@shared/api/appApi';
import { usePathfinder } from '@shared/hooks/usePathFinder';
import { CHUNK_SIZE } from '@shared/lib/chunkSize';
import { useDispatch } from 'react-redux';
import { createThumbnail } from '@entities/file/lib/createThumbnail';
import { toaster } from '@/shared/components/Toaster/toaster';

export const UploadFileButton = () => {
    const [initUpload] = useInitFileUploadMutation();
    const [uploadChunk] = useUploadFileChunkMutation();
    const [uploadPreview] = useUploadFilePreviewMutation();
    const dispatch = useDispatch();
    const currentFolderID = usePathfinder();

    const handleUploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const uploadFileList = e.target.files;
        if (!uploadFileList) {
            toaster.create({
                title: 'No file selected',
                type: 'error',
            });
            return;
        }

        const fileArray = Array.from(uploadFileList);

        for (const file of fileArray) {
            try {
                const { file_id } = await initUpload({
                    file_name: file.name,
                    size: file.size,
                    parent_folder_id: currentFolderID,
                    visible: true,
                }).unwrap();

                if (file.type.startsWith('image/')) {
                    const thumbnail = await createThumbnail(file);
                    await uploadPreview({ file_id, preview: thumbnail });
                }

                let offset = 0;

                while (offset < file.size) {
                    const chunk = file.slice(offset, offset + CHUNK_SIZE);
                    await uploadChunk({ file_id, chunk }).unwrap();
                    offset += chunk.size;
                }
            } catch (error) {
                toaster.create({
                    title: 'File upload error',
                    description: error,
                    type: 'error',
                });
            }
        }
        dispatch(
            appApi.util.invalidateTags([{ type: 'Folders', id: currentFolderID }, 'FS_Files'])
        );
        e.target.value = '';
    };

    return (
        <Box>
            <Button
                justifyContent={'flex-start'}
                variant={'ghost'}
                onClick={() => document.getElementById('fileInput')?.click()}
                paddingLeft={'10px'}
                paddingRight={'10px'}
                className={styles.fileUpload__button}
            >
                <DocumentsIcon />
                Upload File
            </Button>
            <input
                id='fileInput'
                type='file'
                multiple
                className={styles.fileUpload__input}
                onChange={handleUploadFile}
            />
        </Box>
    );
};
