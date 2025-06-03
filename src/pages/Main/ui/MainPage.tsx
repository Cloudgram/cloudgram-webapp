import { FileManager } from '@widgets/FileManager/ui/FileManager';
import { Header } from '@widgets/Header/ui/Header';
import { rootFolderId } from '@/shared/config/app/rootFolder';
import { Navigate, useParams } from 'react-router-dom';

export const MainPage = () => {
    const { folderId } = useParams();

    if (folderId === rootFolderId) {
        return <Navigate to={'/my-drive'} replace />;
    }

    return (
        <>
            <Header />
            <FileManager />
        </>
    );
};
