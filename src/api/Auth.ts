import { requestInstance } from './requestInstance';

export const getAuth = async (secret: string) => {
    try {
        const { data } = await requestInstance.post('/session', {
            secret: secret,
        });
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};

export const logoutSession = async (): Promise<void> => {
    try {
        const { data } = await requestInstance.delete('/session');
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};
