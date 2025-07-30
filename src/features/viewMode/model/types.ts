export type ViewMode = 'grid' | 'list';

export type ViewSection =
    | 'main'
    | 'favorites'
    | 'recent'
    | 'search'
    | 'shared'
    | 'documents'
    | 'audio'
    | 'photos'
    | 'videos'
    | 'trash'
    | 'workspaces';

export type ViewModeState = Partial<Record<ViewSection, ViewMode>>;
