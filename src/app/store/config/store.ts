import { configureStore } from '@reduxjs/toolkit';
import { filterReducer } from '../slices/filterSlice';
import { useDispatch, useSelector, useStore } from 'react-redux';

export const store = configureStore({
    reducer: filterReducer,
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppSelectot = useSelector.withTypes<AppState>();
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppStore = useStore.withTypes<typeof store>();
