import { useQuery } from '@tanstack/react-query';
import { getUser } from '@shared/api/User';
import { UserType } from '@shared/types';

export const useUserQuery = () => {
    return useQuery<UserType>({
        queryKey: ['user'],
        queryFn: () => getUser(),
        staleTime: 24 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 1,
    });
};
