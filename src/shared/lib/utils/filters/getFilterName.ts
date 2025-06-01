import { FILTERS } from '@/shared/config/routes/filters';
import { rootFolderId } from '@/shared/config/app/rootFolder';

export const getFilterName = (filter: string) => {
    switch (filter) {
        case FILTERS.HOME:
            return 'Мой диск';
        case FILTERS.SHARED:
            return 'Общие';
        case FILTERS.FAV:
            return 'Избранное';
        case FILTERS.RECENT:
            return 'Недавние';
        case FILTERS.TRASH:
            return 'Корзина';
        default:
            return filter === rootFolderId ? 'Home' : filter;
    }
};
