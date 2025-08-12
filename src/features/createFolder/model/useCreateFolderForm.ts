import { useCreateFolderMutation, useGetColorsQuery, useGetUserQuery } from '@shared/api/appApi';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { setCreateFolderModalState } from './createFolderModalSlice';
import { useDispatch } from 'react-redux';

export const useCreateFolderForm = () => {
    const dispatch = useDispatch();
    const { currentFolderID } = useParams<{ currentFolderID: string }>();
    const [folderTitle, setFolderTitle] = useState<string>('');
    const [selectedColor, setSelectedColor] = useState<string>('folder_blue');
    const { data: user } = useGetUserQuery();
    const { data: colors, isLoading } = useGetColorsQuery();
    const [triggerCreateFolder] = useCreateFolderMutation();

    const folderProps = {
        parent_folder_id: currentFolderID ?? 'root',
        title: folderTitle ?? 'New Folder',
        color_id: selectedColor ?? 'folder_blue',
    };

    const handleCreateFolder = () => {
        triggerCreateFolder(folderProps);
        dispatch(setCreateFolderModalState());
    };

    const handleClose = () => {
        dispatch(setCreateFolderModalState());
    };

    return {
        user,
        isLoading,
        colors,
        folderTitle,
        setFolderTitle,
        selectedColor,
        setSelectedColor,
        handleCreateFolder,
        handleClose,
    };
};
