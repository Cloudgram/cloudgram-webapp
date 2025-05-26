import { FILTERS } from '../../../shared/config/routes/filters';
import { AppState } from '@app/store/config/store';

export type State = {
    filter: string;
};

export type FilterAction = {
    type: 'shared' | 'home' | 'favorites' | 'recent' | 'trash';
    payload: {
        filter: string;
    };
};

const initialState: State = {
    filter: FILTERS.HOME,
};

export const selectFilter = (state: AppState, filter: string) => {
    return state.filter === filter;
};

export const filterReducer = (state = initialState, action: FilterAction): State => {
    switch (action.type) {
        case 'home':
            return { ...state, filter: FILTERS.HOME };
        case 'shared':
            return { ...state, filter: FILTERS.SHARED };
        case 'favorites':
            return { ...state, filter: FILTERS.FAV };
        case 'recent':
            return { ...state, filter: FILTERS.RECENT };
        case 'trash':
            return { ...state, filter: FILTERS.TRASH };
        default:
            return state;
    }
};
