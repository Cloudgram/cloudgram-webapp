import type { createFolderMenuActions } from '@/features/folder/createFolderMenuActions';
import type { FolderType } from '../model/folderSchema';

export type apiFolderArgs = {
    folderID: string;
};

export type folderCardArgs = {
    folderData: FolderType;
    onDoubleClick?: () => void;
    viewMode: 'grid' | 'list';
    menuActions: ReturnType<typeof createFolderMenuActions>;
};

export type createFolderArgs = {
    parent_folder_id: string;
    title: string;
    color_id: string;
};
