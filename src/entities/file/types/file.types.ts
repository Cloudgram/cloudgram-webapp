import type { FileType } from '../model/fileShema';

export type InitFileArgs = {
    file_name: string;
    size: number;
    parent_folder_id: string;
    visible: boolean;
};

export type InitFileResponse = {
    success: boolean;
    file_id: string;
};

export type FileCardArgs = {
    fileData: FileType;
    viewMode: string;
};

export type FSItemsArgs = {
    folders?: boolean;
    files?: boolean;
    recent?: boolean;
    favorites?: boolean;
    public?: boolean;
    limited?: boolean;
    shared?: boolean;
    alien?: boolean;
};

export type FSItemsResponseType = {
    success: boolean;
    data: FileType[];
};
