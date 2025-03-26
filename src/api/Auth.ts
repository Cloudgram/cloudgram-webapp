import { apiUrl } from "./api_url"

export const getAuth = (code: string) => {
    return fetch(`${apiUrl}/session?code=${code}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => {
        if (res.ok) {
            return true;
        } else if (res.status === 401) {
            console.log('Неверный код');
            return false;
        } else if (res.status === 500) {
            console.log('500 Internal Server Error');
            return false;
        }
    }).catch((error) => {
        console.error('Ошибка запроса:', error);
    });
};