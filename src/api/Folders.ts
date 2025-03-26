import { apiUrl } from './api_url';
import { validateResponse } from '../utils/responseValidator';
import { RootFolderType } from '../types/RootType';

export const getFolders = async (): Promise<RootFolderType> => {
    return fetch(`${apiUrl}/folder/0`, {
        method: 'GET',
        credentials: 'include'
    })
    .then(res => validateResponse(res))
    .then(res => res.json())
    .then((data: RootFolderType) => data);
}