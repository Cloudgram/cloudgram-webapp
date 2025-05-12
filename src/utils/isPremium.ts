import { useUserQuery } from '../components/UserPanel';

export const useIsPremium = () => {
    const { data: user } = useUserQuery();
    return !!user?.subscriber;
};
