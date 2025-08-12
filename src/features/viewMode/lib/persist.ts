import type { ViewModeState } from '../model/viewMode.types';

const STORAGE_KEY = 'viewMode';

export const saveViewModeToLS = (state: ViewModeState) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
};

export const loadViewModeFromLS = (): ViewModeState | undefined => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return undefined;
    try {
        return JSON.parse(data);
    } catch {
        return undefined;
    }
};
