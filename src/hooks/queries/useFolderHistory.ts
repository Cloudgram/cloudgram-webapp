import { useState, useEffect } from 'react';
import { useFoldersQuery } from './useFolderQuery';

interface FolderPathItem {
    id: string;
    title: string;
}

export const useFolderHistory = (currentFolderId: string) => {
    const [folderPath, setFolderPath] = useState<FolderPathItem[]>([]);
    const { data } = useFoldersQuery(currentFolderId);

    useEffect(() => {
        if (!currentFolderId || !data?.title) {
            return;
        }

        const history = JSON.parse(localStorage.getItem('folderHistory') || '[]');

        if (!history.some((item: FolderPathItem) => item.id === currentFolderId)) {
            const newPath = [...history, { id: currentFolderId, title: data.title }];
            localStorage.setItem('folderHistory', JSON.stringify(newPath));
            setFolderPath(newPath);
        } else {
            setFolderPath(history);
        }
    }, [currentFolderId, data]);

    return folderPath;
};
