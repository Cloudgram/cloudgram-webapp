import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ViewMode, ViewModeState, ViewSection } from './types';
import { loadViewModeFromLS } from '../lib/persist';

const defaultState: ViewModeState = {
    main: 'grid',
    favorites: 'grid',
    recent: 'grid',
    search: 'grid',
    shared: 'grid',
    documents: 'grid',
    audio: 'grid',
    photos: 'grid',
    videos: 'grid',
    trash: 'grid',
    workspaces: 'grid',
};

const initialState: ViewModeState = loadViewModeFromLS() || defaultState;

const viewModeSlice = createSlice({
    name: 'viewMode',
    initialState,
    reducers: {
        setViewMode: (state, action: PayloadAction<{ section: ViewSection; mode: ViewMode }>) => {
            const { section, mode } = action.payload;
            state[section] = mode;
        },
    },
});

export const { setViewMode } = viewModeSlice.actions;
export default viewModeSlice.reducer;
