import type { RootState } from '@app/store/store';
import type { ViewMode, ViewSection } from './viewMode.types';

export const selectViewModeBySection =
    (section: ViewSection) =>
    (state: RootState): ViewMode =>
        state.viewMode[section] ?? 'grid';
