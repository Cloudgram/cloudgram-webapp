export const ROUTES = {
    PRIVATE: {
        DASHBOARD: {
            HOME: '/home',
            WORKSPACES: '/workspaces',
            SEARCH: '/search',
        },
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
