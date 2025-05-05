import { apiUrl } from './api_url';

export const getAuth = (code: string) => {
    return fetch(`${apiUrl}/session?code=${code}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then(res => {
        if (!res.ok) throw new Error('Ошибка авторизации');
        return res.json();
    });
};

export const logoutSession = async (): Promise<void> => {
    return fetch(`${apiUrl}/session`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then(res => {
        if (!res.ok) throw new Error('Ошибка авторизации');
        return res.json();
    });
};
