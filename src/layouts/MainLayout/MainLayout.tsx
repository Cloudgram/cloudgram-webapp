import styles from './MainLayout.module.scss';
import { Outlet } from 'react-router-dom';
import { SidebarWidget } from '@widgets/Sidebar/SidebarWidget';
import { CreateFolderModal } from '@features/createFolder/ui/CreateFolderModal';
import { useSelector } from 'react-redux';
import type { RootState } from '@/app/store/store';

export const MainLayout = () => {
    const isCreateFolderModalOpen = useSelector(
        (state: RootState) => state.createFolderModalState.isOpen ?? false
    );
    return (
        <div className={styles.mainLayout}>
            <SidebarWidget />
            <div className={styles.mainLayout__content}>
                <Outlet />
            </div>
            {isCreateFolderModalOpen && <CreateFolderModal />}
        </div>
    );
};
