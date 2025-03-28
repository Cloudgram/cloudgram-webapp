import { apiUrl } from './api_url';
import { validateResponse } from '../utils/responseValidator';
import { RootFolderType } from '../types/RootType';

export const getFolders = async (folderId: string): Promise<RootFolderType> => {
    return fetch(`${apiUrl}/folder/${folderId}`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(res => validateResponse(res))
    .then(res => res.json())
    .then((data: RootFolderType) => data);
}

export const createFolder = async (
    title: string,
    folderId: string,
): Promise<void> => {
    const colorId = 2;
    const queryParams = new URLSearchParams({
        folder_id: folderId,
        title,
        color_id: colorId.toString(),
    });

    return fetch(`${apiUrl}/folder?${queryParams.toString()}`, {
        method: 'POST',
        credentials: 'include',
    })
    .then(res => validateResponse(res))
    .then(res => res.json());
};

export const deleteFolder = async (folderId: string): Promise<void> => {
    return fetch(`${apiUrl}/folder/${folderId}`, {
        method: 'DELETE',
        credentials: 'include',
    })
    .then(res => validateResponse(res))
    .then(undefined);
}