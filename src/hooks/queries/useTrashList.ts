import { useQuery } from '@tanstack/react-query';
import { getTrashList } from '../../api/shared';
import { TrashType } from '../../types/TrashType';

export const useTrashList = () => {
    return useQuery<TrashType>({
        queryKey: ['trash'],
        queryFn: () => getTrashList(),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        refetchOnReconnect: true,
    });
};
