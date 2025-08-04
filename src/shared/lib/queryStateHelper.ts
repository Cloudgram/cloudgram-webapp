export const queryStateHelper = (...states: (boolean | undefined)[]): boolean => {
    return states.some(Boolean);
};
