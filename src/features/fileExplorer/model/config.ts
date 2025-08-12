import { ROUTES } from '@/app/Router/routes.config';

export const fileExplorerFilters = [
    {
        id: 1,
        name: 'Documents',
        route: ROUTES.PRIVATE.FILES.DOCUMENTS,
    },
    {
        id: 2,
        name: 'Photos',
        route: ROUTES.PRIVATE.FILES.PHOTOS,
    },
    {
        id: 3,
        name: 'Videos',
        route: ROUTES.PRIVATE.FILES.VIDEOS,
    },
    {
        id: 4,
        name: 'Audio',
        route: ROUTES.PRIVATE.FILES.AUDIO,
    },
    {
        id: 5,
        name: 'Shared',
        route: ROUTES.PRIVATE.FILES.SHARED,
    },
];
