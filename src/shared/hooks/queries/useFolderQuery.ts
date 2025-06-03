import { useQuery } from '@tanstack/react-query';
import { getFolders } from '@shared/api/Folders';
import { RootFolderType } from '@shared/types';

export const useFoldersQuery = (folderId: string) => {
    return useQuery<RootFolderType>({
        queryKey: ['folders', folderId],
        queryFn: () => getFolders(folderId),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};
