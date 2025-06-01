import axios from 'axios';
import { CHUNK_SIZE } from '@/shared/config/files/chunkSize';
import { requestInstance } from './requestInstance';

interface InitFileResponse {
    success: boolean;
    file_id: string;
}

// const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const uploadFile = async (file: File, folderId: string) => {
    try {
        const { data: initResponse } = await requestInstance.post<InitFileResponse>('/file', {
            file_name: file.name,
            size: file.size,
            folder_id: folderId,
        });

        if (!initResponse?.success || !initResponse?.file_id) {
            throw new Error('Failed to initialize file upload - invalid server response');
        }

        const fileId = initResponse.file_id;

        let offset = 0;
        while (offset < file.size) {
            const chunk = file.slice(offset, offset + CHUNK_SIZE);
            const formData = new FormData();
            formData.append('chunk', chunk);

            await requestInstance.post(`/file/${fileId}/chunk`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Accept: 'application/json',
                },
                onUploadProgress: progressEvent => {
                    const percentCompleted = Math.round(
                        ((offset + progressEvent.loaded) * 100) / file.size
                    );
                    console.log(`Upload progress: ${percentCompleted}%`);
                },
            });

            // await delay(700);
            offset += chunk.size;
        }

        return fileId;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Server response:', error.response?.data);
            console.error('Request config:', {
                url: error.config?.url,
                data: error.config?.data,
            });
        }
        console.error('Error uploading file:', error);
        throw error;
    }
};

export const deleteFile = async (idsMassive: string[]): Promise<void> => {
    const { data } = await requestInstance.patch(
        '/trash',
        {
            ids: idsMassive,
        },
        {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
        }
    );
    return data;
};

export const downloadFile = async (
    fileId: string,
    fileName: string,
    fileExtension: string
): Promise<void> => {
    const { data, headers } = await requestInstance.get(`/file/${fileId}`, {
        responseType: 'blob',
    });

    const contentDisposition = headers['content-disposition'];
    const suggestedFileName =
        contentDisposition?.match(/filename="?(.+?)"?$/)?.[1] || `${fileName}.${fileExtension}`;

    const blob = new Blob([data], {
        type: headers['content-type'],
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = suggestedFileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
};
