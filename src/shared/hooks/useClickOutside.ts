import { useEffect, useRef, useCallback } from 'react';

interface UseClickOutsideOptions {
    enabled?: boolean;
    escapeKey?: boolean;
    mouseEvents?: ('mousedown' | 'mouseup' | 'click')[];
    excludeRefs?: React.RefObject<HTMLElement | null>[];
}

export const useClickOutside = <T extends HTMLElement = HTMLDivElement>(
    callback: () => void,
    options: UseClickOutsideOptions = {}
) => {
    const {
        enabled = true,
        escapeKey = true,
        mouseEvents = ['mousedown'],
        excludeRefs = [],
    } = options;

    const ref = useRef<T | null>(null);
    const memoizedCallback = useCallback(callback, [callback]);

    useEffect(() => {
        if (!enabled) return;

        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;

            if (ref.current && ref.current.contains(target)) {
                return;
            }

            const isClickOnExcludedElement = excludeRefs.some(
                excludeRef => excludeRef.current && excludeRef.current.contains(target)
            );

            if (isClickOnExcludedElement) {
                return;
            }

            memoizedCallback();
        };

        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                memoizedCallback();
            }
        };

        mouseEvents.forEach(eventType => {
            document.addEventListener(eventType, handleClickOutside);
        });

        if (escapeKey) {
            document.addEventListener('keydown', handleKeyDown);
        }

        return () => {
            mouseEvents.forEach(eventType => {
                document.removeEventListener(eventType, handleClickOutside);
            });

            if (escapeKey) {
                document.removeEventListener('keydown', handleKeyDown);
            }
        };
    }, [memoizedCallback, enabled, escapeKey, mouseEvents, excludeRefs]);

    return ref;
};
