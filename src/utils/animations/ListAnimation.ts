import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export const ListAnimation = (dependencies: unknown[] = []) => {
    const listRef = useRef<HTMLDivElement>(null);
    const animationRef = useRef<GSAPAnimation>();

    useEffect(() => {
        if (!listRef.current) return;

        const items = listRef.current.children;

        if (animationRef.current) {
            animationRef.current.kill();
        }

        gsap.set(items, {
            opacity: 0,
        });

        animationRef.current = gsap.to(items, {
            opacity: 1,
            duration: 0.3,
            stagger: 0.05,
            ease: 'power2.out',
            clearProps: 'all',
        });

        return () => {
            if (animationRef.current) {
                animationRef.current.kill();
            }
        };
    }, [dependencies]);

    return listRef;
};
