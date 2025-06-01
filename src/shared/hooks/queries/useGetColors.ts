import { useQuery } from '@tanstack/react-query';
import { getColors } from '@shared/api/colors';
import { ColorType } from '@shared/types';

export const useGetColors = () => {
    return useQuery<ColorType>({
        queryKey: ['folders'],
        queryFn: () => getColors(),
        staleTime: 300000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
