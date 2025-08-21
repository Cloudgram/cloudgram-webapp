import { PhotosIcon } from '@/shared/assets/icons/all/PhotosIcon';
import { VideosIcon } from '@/shared/assets/icons/all/VideosIcon';
import { DocumentsIcon } from '@/shared/assets/icons/all/DocumentsIcon';
import { SharedIcon } from '@/shared/assets/icons/all/SharedIcon';
import { AudioIcon } from '@/shared/assets/icons/all/AudioIcon';
import { HomeIcon } from '@/shared/assets/icons/all/HomeIcon';
import { WorkspacesIcon } from '@/shared/assets/icons/all/WorkspacesIcon';
import { TrashIcon } from '@/shared/assets/icons/all/TrashIcon';
import { SettingsIcon } from '@/shared/assets/icons/all/SettingsIcon';

export const sidebarMainItems = [
    {
        icon: HomeIcon,
        label: 'Home',
        route: '/home',
    },
    {
        icon: WorkspacesIcon,
        label: 'Workspaces',
        route: '/workspaces',
    },
    // {
    //     icon: SearchIcon,
    //     label: 'Search',
    //     route: '/search',
    // },
];

export const sidebarCategoriesItems = [
    {
        icon: PhotosIcon,
        label: 'Photos',
        route: '/photos',
    },
    {
        icon: VideosIcon,
        label: 'Videos',
        route: '/videos',
    },
    {
        icon: DocumentsIcon,
        label: 'Documents',
        route: '/documents',
    },
    {
        icon: AudioIcon,
        label: 'Audio',
        route: '/audio',
    },
    {
        icon: SharedIcon,
        label: 'Shared',
        route: '/shared',
    },
    {
        icon: TrashIcon,
        label: 'Trash',
        route: '/trash',
    },
];

export const sidebarSettingsItems = [
    {
        icon: SettingsIcon,
        label: 'Settings',
        route: '/settings',
    },
];
