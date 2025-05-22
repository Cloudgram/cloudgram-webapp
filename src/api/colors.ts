import { ColorType } from '../types/color';
import { requestInstance } from './requestInstance';

export const getColors = async (): Promise<ColorType> => {
    try {
        const { data } = await requestInstance.get('/color');
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};
