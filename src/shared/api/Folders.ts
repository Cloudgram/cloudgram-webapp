import { RootFolderType } from '@shared/types';
import { requestInstance } from './requestInstance';

export const getFolders = async (folderId: string): Promise<RootFolderType> => {
    try {
        const data = await requestInstance.get(`/folder/${folderId}`);
        return data.data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};

export const createFolder = async (
    title: string,
    folderId: string,
    colorId: string
): Promise<void> => {
    try {
        const { data } = await requestInstance.post('/folder', {
            folder_id: folderId,
            title: title,
            color_id: colorId,
        });
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};

export const deleteFolder = async (idsMassive: string[]): Promise<void> => {
    try {
        const { data } = await requestInstance.patch('/trash', {
            ids: idsMassive,
        });
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};

export const changeFolder = async (
    currentFolderId: string,
    targetId?: string,
    currentTitle?: string,
    currentColorId?: string
) => {
    try {
        const { data } = await requestInstance.patch(`/folder/${currentFolderId}/edit`, {
            folder_id: targetId,
            title: currentTitle,
            color_id: currentColorId,
        });
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};
