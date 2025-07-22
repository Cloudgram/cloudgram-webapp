// widgets/Sidebar/model/config.ts
import { PhotosIcon } from '@shared/assets/icons/PhotosIcon';
import { VideosIcon } from '@shared/assets/icons/VideosIcon';
import { DocumentsIcon } from '@shared/assets/icons/DocumentsIcon';
import { SharedIcon } from '@shared/assets/icons/SharedIcon';
import { AudioIcon } from '@shared/assets/icons/AudioIcon';
import { HomeIcon } from '@shared/assets/icons/HomeIcon';
import { WorkspacesIcon } from '@shared/assets/icons/WorkspacesIcon';
import { SearchIcon } from '@shared/assets/icons/SearchIcon';
import { TrashIcon } from '@shared/assets/icons/TrashIcon';
import { SettingsIcon } from '@shared/assets/icons/SettingsIcon';

export const sidebarMainItems = [
    {
        icon: HomeIcon,
        label: 'Home',
        route: '/',
    },
    {
        icon: WorkspacesIcon,
        label: 'Workspaces',
        route: '/workspaces',
    },
    {
        icon: SearchIcon,
        label: 'Search',
        route: '/search',
    },
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
