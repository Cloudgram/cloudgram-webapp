import { useEffect } from 'react';

export const useHotkeys = (key: string, callback: () => void) => {
    useEffect(() => {
        const handler = (event: KeyboardEvent) => {
            if (event.ctrlKey && event.shiftKey && event.key.toLowerCase() === key.toLowerCase()) {
                event.preventDefault();
                callback();
            } else return;
        };

        document.addEventListener('keydown', handler);
        return () => document.removeEventListener('keydown', handler);
    }, [key, callback]);
};
