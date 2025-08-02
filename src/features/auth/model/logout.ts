import { useDeleteSessionMutation } from '@/shared/api/appApi';
import { useNavigate } from 'react-router-dom';
import { toaster } from '@shared/components/Toaster/toaster';

export function useLogout() {
    const navigate = useNavigate();
    const [deleteSession, { isLoading }] = useDeleteSessionMutation();

    const logout = async () => {
        if (isLoading) return;
        try {
            await deleteSession().unwrap();
            navigate('/auth');
        } catch (e) {
            toaster.create({
                title: 'Authorization error',
                description: e,
                type: 'error',
                action: {
                    label: 'Retry',
                    onClick: async () => {
                        await deleteSession().unwrap();
                        navigate('/auth');
                    },
                },
            });
        }
    };

    return {
        logout,
        isLoading,
    };
}
