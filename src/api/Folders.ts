import { apiUrl } from './api_url';
import { validateResponse } from '../utils/responseValidator';
import { RootFolderType } from '../types/RootType';

export const getFolders = async (
    folderId: string
): Promise<RootFolderType> => {
    try {
        const response = await fetch(`${apiUrl}/folder/${folderId}`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            redirect: 'follow',
            mode: 'cors'
        });

        if (!response.ok) {
            console.error(`Ошибка: ${response.status} ${response.statusText}`);
            throw new Error(`Ошибка: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};

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
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        mode: 'cors',
        redirect: 'follow'
    })
        .then(res => validateResponse(res))
        .then(res => res.json());
};

export const deleteFolder = async (folderId: string): Promise<void> => {
    return fetch(`${apiUrl}/folder/${folderId}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        mode: 'cors',
        redirect: 'follow'
    })
        .then(res => validateResponse(res))
        .then(undefined);
}