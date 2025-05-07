import { useQuery } from '@tanstack/react-query';
import { getFolders } from '../api/Folders';
import { RootFolderType } from '../types/RootType';

export const useFoldersQuery = (folderId: string) => {
    return useQuery<RootFolderType>({
        queryKey: ['folders', folderId],
        queryFn: () => getFolders(folderId),
        staleTime: 300000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
