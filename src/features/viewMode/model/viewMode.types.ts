export type ViewMode = 'grid' | 'list';

export type ViewSection = 'main' | 'folderViewerFolders' | 'folderViewerFiles';

export type ViewModeState = Partial<Record<ViewSection, ViewMode>>;
