import { FileManager } from '../../components/FileManager/FileManager';
import { Header } from './index';
import { useParams, Navigate } from 'react-router-dom';

export const MainPage = () => {
    const { folderId } = useParams();

    if (folderId === '0') {
        return <Navigate to={'/my-drive'} replace />;
    }

    return (
        <>
            <Header />
            <FileManager />
        </>
    );
};
