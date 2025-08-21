import React from 'react';
import { Stack } from '@chakra-ui/react';
import styles from './Header.module.scss';
import { UploadFileButton } from '@/features/uploadFile/ui/UploadFileButton';
import { CreateFolderButton } from '@/features/createFolder/ui/CreateFolderButton';

interface ActionMenuProps {
    isOpen: boolean;
}

export const HeaderActionMenu = React.forwardRef<HTMLDivElement, ActionMenuProps>(
    ({ isOpen }, ref) => {
        return (
            <Stack ref={ref} display={isOpen ? 'flex' : 'none'} className={styles.headerActionMenu}>
                <UploadFileButton />
                <CreateFolderButton />
            </Stack>
        );
    }
);
