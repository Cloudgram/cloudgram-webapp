import { RootFolderType } from '../types';

export const useFilteredList = (items: RootFolderType | null, filter: string) => {
    const filteredFolders = items
        ? [...items.folders].filter(folder => folder.tags.includes(filter))
        : [];
    const filteredFiles = items ? [...items.files].filter(file => file.tags.includes(filter)) : [];
    return {
        filteredFolders: filteredFolders,
        filteredFiles: filteredFiles,
    };
};
