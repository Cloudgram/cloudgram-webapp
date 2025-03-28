import { validateResponse } from "../utils/responseValidator";
import { apiUrl } from "./api_url";

export const uploadFile = async (file: File, folderId: string) => {
    const formData = new FormData();
    formData.append('file', file);

    const queryParams = new URLSearchParams({
        file_name: file.name,
        size: file.size.toString(),
        folder_id: folderId,
    })

    return fetch(`${apiUrl}/file?${queryParams.toString()}`, {
        method: 'POST',
        credentials: 'include',
        body: formData
    })
        .then(res => validateResponse(res))
        .then(res => res.json());
}

export const deleteFile = async (fileId: string): Promise<void> => {
    return fetch(`${apiUrl}/file/${fileId}`, {
        method: 'DELETE',
        credentials: 'include',
    })
        .then(res => validateResponse(res))
        .then(undefined);
}

export const downloadFile = async (fileId: string): Promise<void> => {
    const response = await fetch(`${apiUrl}/file/${fileId}`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileId;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
}