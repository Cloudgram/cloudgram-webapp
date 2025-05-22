import { useState, useRef } from 'react';
import { changeFolder } from '../../api/Folders';
import { queryClient } from '../../api/queryClient';

interface DraggedFolder {
    id: string;
}

export const useDragAndDrop = () => {
    const [draggedFolder, setDraggedFolder] = useState<DraggedFolder | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const draggedFolderRef = useRef<DraggedFolder | null>(null);

    const handleDragStart = (folder: DraggedFolder) => (e: React.DragEvent<HTMLElement>) => {
        setDraggedFolder(folder);
        draggedFolderRef.current = folder;
        setIsDragging(true);
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('application/json', JSON.stringify(folder));
    };

    const handleDragEnd = () => {
        setDraggedFolder(null);
        draggedFolderRef.current = null;
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (targetFolderId: string) => async (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // Пытаемся получить данные из dataTransfer
        const folderData = e.dataTransfer.getData('application/json');
        const folder = folderData ? JSON.parse(folderData) : draggedFolderRef.current;

        if (!folder) return;
        if (folder.id === targetFolderId) return;

        await changeFolder(folder.id, targetFolderId);
        await queryClient.invalidateQueries({ queryKey: ['folders'] });
        await queryClient.invalidateQueries({ queryKey: ['folders', folder.folder_id] });
        await queryClient.invalidateQueries({ queryKey: ['folderHistory'] });
    };

    return {
        draggedFolder,
        isDragging,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDrop,
    };
};
