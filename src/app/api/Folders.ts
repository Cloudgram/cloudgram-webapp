import { apiUrl } from './api_url';
import { validateResponse } from '../../utils/responseValidator';
import { RootFolderType } from '../types/RootType';

export const getFolders = async (): Promise<RootFolderType> => {
    return fetch(`${apiUrl}/folder/0`, {
        headers: {
            'X-Authorization': '1'
        }
    })
    .then(res => validateResponse(res))
    .then(res => res.json())
    .then((data: RootFolderType) => data.folders);
}