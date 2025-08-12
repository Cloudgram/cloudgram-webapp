import type { RootState } from '@app/store/store';
import type { ViewSection } from './viewMode.types';

export const selectViewModeBySection = (section: ViewSection) => (state: RootState) =>
    state.viewMode[section] ?? 'grid';
