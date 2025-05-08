import { validateResponse } from '../utils/validators/responseValidator';
import { apiUrl } from './api_url';

// export const uploadFile = async (file: File, folderId: string) => {
//     const queryParams = new URLSearchParams({
//         file_name: file.name,
//         size: file.size.toString(),
//         folder_id: folderId,
//     });

//     return fetch(`${apiUrl}/file?${queryParams.toString()}`, {
//         method: 'POST',
//         credentials: 'include',
//         body: file,
//         headers: {
//             'Content-Disposition': `attachment; filename="${file.name}"`,
//             'Content-Type': file.type,
//         },
//     })
//         .then(res => validateResponse(res))
//         .then(res => res.json());
// };

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const uploadFile = async (
    file: File,
    folderId: string,
    isMultiUpload: boolean = false,
) => {
    const CHUNK_SIZE = 5 * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const fileId = crypto.randomUUID();

    if (isMultiUpload) {
        await delay(700);
    }

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunk = file.slice(start, end);

        const queryParams = new URLSearchParams({
            file_name: file.name,
            size: file.size.toString(),
            folder_id: folderId,
            chunk_index: chunkIndex.toString(),
            total_chunks: totalChunks.toString(),
            file_id: fileId,
        });

        const response = await fetch(
            `${apiUrl}/file?${queryParams.toString()}`,
            {
                method: 'POST',
                credentials: 'include',
                body: chunk,
                headers: {
                    'Content-Disposition': `attachment; filename="${file.name}"`,
                    'Content-Type': file.type,
                },
            },
        );

        if (!response.ok) {
            throw new Error(
                `Ошибка загрузки чанка ${chunkIndex + 1}/${totalChunks}`,
            );
        }

        console.log(`Загружен чанк ${chunkIndex + 1} из ${totalChunks}`);
    }

    console.log('✅ Загрузка завершена');
};

export const deleteFile = async (fileId: string): Promise<void> => {
    return fetch(`${apiUrl}/file/${fileId}`, {
        method: 'DELETE',
        credentials: 'include',
    })
        .then(res => validateResponse(res))
        .then(undefined);
};

export const downloadFile = async (
    fileId: string,
    fileName: string,
    fileExtension: string,
): Promise<void> => {
    const response = await fetch(`${apiUrl}/file/${fileId}`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const contentDisposition = response.headers.get('Content-Disposition');
    const suggestedFileName =
        contentDisposition?.match(/filename="?(.+?)"?$/)?.[1] ||
        `${fileName}.${fileExtension}`;

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = suggestedFileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
};
