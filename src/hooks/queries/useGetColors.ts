import { useQuery } from '@tanstack/react-query';
import { getColors } from '../../api/colors';
import { ColorType } from '../../types/color';

export const useGetColors = () => {
    return useQuery<ColorType>({
        queryKey: ['folders'],
        queryFn: () => getColors(),
        staleTime: 300000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
    });
};
