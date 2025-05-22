import { validateResponse } from '../utils/validators/responseValidator';
import { UserType } from '../types/UserType';
import { API_URL } from '../constants/apiUrl';
// import { apiUrl } from './api_url';

export const getUser = async (): Promise<UserType> => {
    return fetch(`${API_URL}/user`, {
        method: 'GET',
        credentials: 'include',
    })
        .then(res => validateResponse(res))
        .then(res => res.json());
};
