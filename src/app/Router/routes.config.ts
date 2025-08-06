export const ROUTES = {
    PRIVATE: {
        DASHBOARD: {
            HOME: '/home',
            WORKSPACES: '/workspaces',
        },
        FILES: {
            PHOTOS: '/photos',
            VIDEOS: '/videos',
            DOCUMENTS: '/documents',
            AUDIO: '/audio',
            SHARED: '/shared',
            TRASH: '/trash',
        },
        FOLDER: '/folder/:currentFolderID',
        SETTINGS: '/settings',
    },
    PUBLIC: {
        AUTH: '/auth',
        NOT_FOUND: '/not-found',
    },
} as const;
