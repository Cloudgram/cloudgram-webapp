import { validateResponse } from '@/shared/lib/utils/validators/responseValidator';
import { UserType } from '@shared/types';
import { API_URL } from '@/shared/config/api/apiUrl';
// import { apiUrl } from './api_url';

export const getUser = async (): Promise<UserType> => {
    return fetch(`${API_URL}/user`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => validateResponse(res))
        .then(res => res.json());
};
