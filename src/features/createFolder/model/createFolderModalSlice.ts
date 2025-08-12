import { createSlice } from '@reduxjs/toolkit';

interface CreateFolderModalState {
    isOpen: boolean;
}

const initialState: CreateFolderModalState = {
    isOpen: false,
};

const createFolderModalSlice = createSlice({
    name: 'createFolderModalState',
    initialState,
    reducers: {
        setCreateFolderModalState: state => {
            state.isOpen = !state.isOpen;
        },
    },
});

export const { setCreateFolderModalState } = createFolderModalSlice.actions;
export default createFolderModalSlice.reducer;
