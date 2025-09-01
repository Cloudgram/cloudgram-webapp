import type { FileType } from '@/entities/file/model/fileSchema';
import type { FolderType } from '@/entities/folder/model/folderSchema';

export type SearchItemType = FileType | FolderType;
export type SearchItemResponseType = {
    success: boolean;
    data: SearchItemType[];
};
