// gsapAnimations.ts
import gsap from 'gsap';

export const animatePanel = (panelRef: React.RefObject<HTMLDivElement>, isVisible: boolean) => {
    if (isVisible && panelRef.current) {
        gsap.fromTo(
            panelRef.current,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.3, ease: 'power2.out' }
        );
    } else if (!isVisible && panelRef.current) {
        gsap.to(panelRef.current, {
            opacity: 0,
            x: -20,
            duration: 0.3,
            ease: 'power2.in',
            onComplete: () => {
                if (panelRef.current) {
                    panelRef.current.style.display = 'none';
                }
            },
        });
    }
};