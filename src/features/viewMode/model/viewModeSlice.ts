import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { ViewMode, ViewModeState, ViewSection } from './viewMode.types';
import { loadViewModeFromLS } from '../lib/persist';

const defaultState: ViewModeState = {
    main: 'grid',
    folderViewerFolders: 'grid',
    folderViewerFiles: 'grid',
    categoryViewerFiles: 'grid',
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
