import { useState } from 'react';

interface UseDragAndDropProps {
    onMove: (
        sourceId: string,
        targetId: string,
        sourceFolderTitle: string,
        sourceColorId: number
    ) => void;
}

export const useDragAndDrop = ({ onMove }: UseDragAndDropProps) => {
    const [draggedFolder, setDraggedFolder] = useState<number | null>(null);
    const [draggedOverFolder, setDraggedOverFolder] = useState<number | null>(null);

    const handleDragStart = (e: React.DragEvent, id: number) => {
        e.stopPropagation();
        setDraggedFolder(id);
    };

    const handleDragEnd = () => {
        setDraggedFolder(null);
        setDraggedOverFolder(null);
    };

    const handleDragOver = (e: React.DragEvent, folderId: number) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedFolder !== folderId) {
            setDraggedOverFolder(folderId);
            e.dataTransfer.dropEffect = 'move';
        } else {
            e.dataTransfer.dropEffect = 'none';
        }
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDraggedOverFolder(null);
    };

    const handleDrop = (e: React.DragEvent, targetFolder: any) => {
        e.preventDefault();
        e.stopPropagation();
        if (draggedFolder && draggedFolder !== targetFolder.id) {
            onMove(
                draggedFolder.toString(),
                targetFolder.id.toString(),
                targetFolder.title,
                targetFolder.color.id
            );
        }
        setDraggedFolder(null);
        setDraggedOverFolder(null);
    };

    return {
        draggedFolder,
        draggedOverFolder,
        handleDragStart,
        handleDragEnd,
        handleDragOver,
        handleDragLeave,
        handleDrop,
    };
};
