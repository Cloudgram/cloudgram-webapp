import { useQuery } from '@tanstack/react-query';
import { getTrashList } from '@shared/api/shared';
import { TrashFolderType } from '@shared/types';

export const useTrashList = (enabled: boolean = false) => {
    return useQuery<TrashFolderType>({
        queryKey: ['trash'],
        queryFn: () => getTrashList(),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
        enabled,
    });
};
