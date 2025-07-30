import { configureStore } from '@reduxjs/toolkit';
import viewModeReducer from '@features/viewMode/model/viewModeSlice';
import { appApi } from '@/shared/api/appApi';
import { saveViewModeToLS } from '@/features/viewMode/lib/persist';

export const store = configureStore({
    reducer: {
        [appApi.reducerPath]: appApi.reducer,
        viewMode: viewModeReducer,
    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(appApi.middleware),
});

store.subscribe(() => {
    saveViewModeToLS(store.getState().viewMode);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
