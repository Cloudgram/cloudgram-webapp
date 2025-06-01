import { useUserQuery } from '@/shared/hooks/queries/useUserQuery';

export const useIsPremium = () => {
    const { data: user } = useUserQuery();
    return !!user?.subscriber;
};
