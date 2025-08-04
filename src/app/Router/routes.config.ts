export const ROUTES = {
    PRIVATE: {
        DASHBOARD: {
            HOME: '/home',
            WORKSPACES: '/workspaces',
        },
        FOLDER: '/folder/:currentFolderID',
        FILES: {
            PHOTOS: '/photos',
            VIDEOS: '/videos',
            DOCUMENTS: '/documents',
            AUDIO: '/audio',
            SHARED: '/shared',
            TRASH: '/trash',
        },
    },
    PUBLIC: {
        AUTH: '/auth',
        NOT_FOUND: '/404',
    },
} as const;
