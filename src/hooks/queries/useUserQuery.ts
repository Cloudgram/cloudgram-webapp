import { useQuery } from '@tanstack/react-query';
import { getUser } from '../../api/User';
import { UserType } from '../../types/UserType';

export const useUserQuery = () => {
    return useQuery<UserType>({
        queryKey: ['user'],
        queryFn: () => getUser(),
        staleTime: 12 * 60 * 60 * 1000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retry: 2,
    });
};
