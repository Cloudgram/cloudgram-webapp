import { SearchListType } from '@shared/types/SearchListType';
import { getSearchList } from '@shared/api/shared';
import { useQuery } from '@tanstack/react-query';

export const useSearchList = (enabled: boolean) => {
    return useQuery<SearchListType>({
        queryKey: ['searchlist'],
        queryFn: () => getSearchList(),
        staleTime: 300000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        enabled,
    });
};
