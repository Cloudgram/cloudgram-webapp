import React from 'react';
import { Button, Stack } from '@chakra-ui/react';
import styles from './Header.module.scss';
import { DocumentsIcon } from '@shared/assets/icons/DocumentsIcon';
import { FolderIconSmall } from '@shared/assets/icons/FolderIconSmall';
import { useDispatch } from 'react-redux';
import { setCreateFolderModalState } from '@/features/createFolder/model/createFolderModalSlice';

interface ActionMenuProps {
    isOpen: boolean;
}

export const ActionMenu = React.forwardRef<HTMLDivElement, ActionMenuProps>(({ isOpen }, ref) => {
    const dispatch = useDispatch();

    return (
        <Stack ref={ref} display={isOpen ? 'flex' : 'none'} className={styles.headerActionMenu}>
            <Button
                justifyContent={'flex-start'}
                variant={'ghost'}
                onClick={() => {}}
                paddingLeft={'10px'}
                paddingRight={'10px'}
            >
                <DocumentsIcon />
                Upload File
            </Button>
            <Button
                justifyContent={'flex-start'}
                variant={'ghost'}
                onClick={() => dispatch(setCreateFolderModalState())}
                paddingLeft={'10px'}
                paddingRight={'10px'}
            >
                <FolderIconSmall />
                Create Folder
            </Button>
        </Stack>
    );
});
