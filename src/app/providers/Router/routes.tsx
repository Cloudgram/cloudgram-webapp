import { Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from './routes.config';
import { MainLayout } from '@layouts/MainLayout/MainLayout';
import { AuthPage } from '@pages/auth/AuthPage';
import { HomePage } from '@pages/home/HomePage';
import { NotFoundPage } from '@pages/NotFound/NotFoundPage';
import { RouterGuard } from './RouterGuard';
import { PhotosPage } from '@pages/photos/PhotosPage';
import { VideosPage } from '@pages/videos/VideosPage';
import { DocumentsPage } from '@pages/documents/DocumentsPage';
import { WorkSpacesPage } from '@pages/workspaces/WorkSpacesPage';
import { AudioPage } from '@pages/audio/AudioPage';
import { SharedPage } from '@pages/shared/SharedPage';
import { TrashPage } from '@pages/trash/TrashPage';
import { CloudLayout } from '@/layouts/CloudLayout/CloudLayout';
import { FolderPage } from '@/pages/folder/FolderPage';

export const AppRoutes = () => {
    return (
        <Suspense fallback={`Loading...`}>
            <Routes>
                <Route path={ROUTES.PUBLIC.AUTH} element={<AuthPage />} />
                <Route path={ROUTES.PUBLIC.NOT_FOUND} element={<NotFoundPage />} />
                <Route element={<RouterGuard />}>
                    <Route element={<MainLayout />}>
                        <Route element={<CloudLayout />}>
                            <Route path={ROUTES.PRIVATE.DASHBOARD.HOME} element={<HomePage />} />
                            <Route
                                path={ROUTES.PRIVATE.DASHBOARD.WORKSPACES}
                                element={<WorkSpacesPage />}
                            />
                            <Route path={ROUTES.PRIVATE.FOLDER} element={<FolderPage />} />
                            <Route path={ROUTES.PRIVATE.FILES.PHOTOS} element={<PhotosPage />} />
                            <Route path={ROUTES.PRIVATE.FILES.VIDEOS} element={<VideosPage />} />
                            <Route path={ROUTES.PRIVATE.FILES.AUDIO} element={<AudioPage />} />
                            <Route path={ROUTES.PRIVATE.FILES.SHARED} element={<SharedPage />} />
                            <Route path={ROUTES.PRIVATE.FILES.TRASH} element={<TrashPage />} />
                            <Route
                                path={ROUTES.PRIVATE.FILES.DOCUMENTS}
                                element={<DocumentsPage />}
                            />
                        </Route>
                    </Route>
                </Route>
                <Route path='/' element={<Navigate to={ROUTES.PRIVATE.DASHBOARD.HOME} replace />} />
                <Route path='*' element={<Navigate to={ROUTES.PUBLIC.NOT_FOUND} replace />} />
            </Routes>
        </Suspense>
    );
};
