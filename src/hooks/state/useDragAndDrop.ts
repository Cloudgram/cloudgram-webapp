import { useState } from 'react';
import { changeFolder } from '../../api/Folders';
import { queryClient } from '../../api/queryClient';

interface DraggedFolder {
    id: string;
    title: string;
    color_id: number;
}

export const useDragAndDrop = () => {
    const [draggedFolder, setDraggedFolder] = useState<DraggedFolder | null>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleDragStart = (folder: DraggedFolder) => (e: React.DragEvent<HTMLElement>) => {
        setDraggedFolder(folder);
        setIsDragging(true);
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnd = () => {
        setDraggedFolder(null);
        setIsDragging(false);
    };

    const handleDragOver = (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };

    const handleDrop = (targetFolderId: string) => async (e: React.DragEvent<HTMLElement>) => {
        e.preventDefault();

        if (!draggedFolder) return;

        try {
            await changeFolder(
                draggedFolder.id,
                targetFolderId,
                draggedFolder.title,
                draggedFolder.color_id
            );

            // Invalidate queries to refetch folder data
            await queryClient.invalidateQueries({ queryKey: ['folders'] });
        } catch (error) {
            console.error('Error moving folder:', error);
        }

        setIsDragging(false);
        setDraggedFolder(null);
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
