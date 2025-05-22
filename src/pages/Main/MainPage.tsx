import { FileManager } from '../../components/FileManager/FileManager';
import { rootFolderId } from '../../constants/rootFolder';
import { Header } from './index';
import { useParams, Navigate } from 'react-router-dom';

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
