import { useUserQuery } from '../components/UserPanel';

export const isPremium = () => {
    const { data: user } = useUserQuery();
    if (user?.subscriber) return true;
    return false;
};
