import { FileExplorer } from '@features/fileExplorer/ui/FileExplorer';
import styles from './FileExplorerWidget.module.scss';
import { FileExplorerFilters } from '@features/fileExplorer/ui/FileExplorerFilters';
import { ViewToggle } from '@features/viewMode/ui/ViewToggle';
import { useAppDispatch, useAppSelector } from '@shared/hooks/useRedux';
import { selectViewModeBySection } from '@features/viewMode/model/selectors';
import { setViewMode } from '@features/viewMode/model/viewModeSlice';

export const FileExplorerWidget = () => {
    const section = 'main' as const;

    const viewMode = useAppSelector(selectViewModeBySection(section));
    const dispatch = useAppDispatch();

    return (
        <div className={styles.fileExplorerWidget__container}>
            <div className={styles.fileExplorerWidget__header}>
                <h3 className={styles.fileExplorerWidget__title}>All Files</h3>
                <ViewToggle
                    value={viewMode}
                    onChange={mode => dispatch(setViewMode({ section, mode }))}
                />
            </div>
            <FileExplorerFilters />
            <FileExplorer viewMode={viewMode} />
        </div>
    );
};
