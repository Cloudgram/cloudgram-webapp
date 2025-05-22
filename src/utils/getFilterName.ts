import { FILTERS } from '../constants/filters';
import { rootFolderId } from '../constants/rootFolder';

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
