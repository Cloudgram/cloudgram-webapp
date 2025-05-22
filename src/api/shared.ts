import { requestInstance } from './requestInstance';

export const copyEntity = async (
    currentId: string,
    targetFolderId: string,
    isFolder: boolean
): Promise<void> => {
    try {
        const endpoint = isFolder ? 'folder' : 'file';
        const { data } = await requestInstance.patch(`/${endpoint}/${currentId}/copy`, {
            folder_id: targetFolderId,
        });
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};

export const getTrashList = async (): Promise<void> => {
    try {
        const { data } = await requestInstance.get('/trash');
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};

export const eleminateEntity = async (idsMassive: string[]): Promise<void> => {
    try {
        const { data } = await requestInstance.delete('/trash', {
            data: { ids: idsMassive },
        });
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};

export const repairEntity = async (idsMassive: string[]): Promise<void> => {
    try {
        const { data } = await requestInstance.patch('/trash/repair', {
            ids: idsMassive,
        });
        return data;
    } catch (error) {
        console.error('Ошибка при выполнении запроса:', error);
        throw error;
    }
};
