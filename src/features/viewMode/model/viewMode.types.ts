export type ViewMode = 'grid' | 'list';

export type ViewSection =
    | 'main'
    | 'folderViewerFolders'
    | 'folderViewerFiles'
    | 'categoryViewerFiles';

export type ViewModeState = Partial<Record<ViewSection, ViewMode>>;
