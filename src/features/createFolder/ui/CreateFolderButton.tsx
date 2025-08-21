import { FolderIconSmall } from '@/shared/assets/icons/all/FolderIconSmall';
import { Button } from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { setCreateFolderModalState } from '../model/createFolderModalSlice';

export const CreateFolderButton = () => {
    const dispatch = useDispatch();

    return (
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
    );
};
