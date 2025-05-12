import { ColorType } from '../types/color';
import { validateResponse } from '../utils/validators/responseValidator';
import { apiUrl } from './api_url';

export const getColors = async (): Promise<ColorType> => {
    return fetch(`${apiUrl}/color`, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        mode: 'cors',
        redirect: 'follow',
    })
        .then(res => validateResponse(res))
        .then(res => res.json());
};
