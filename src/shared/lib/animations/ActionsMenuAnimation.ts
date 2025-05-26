import gsap from 'gsap';

export const animateFileActionMenu = (menuRef: React.RefObject<HTMLDivElement>, isVisible: boolean) => {
    if (isVisible && menuRef.current) {
        menuRef.current.style.display = 'block';
        gsap.fromTo(
            menuRef.current,
            { height: 0, opacity: 0 },
            { height: 'auto', opacity: 1, duration: 0.2, ease: 'power2.out' }
        );
    } else if (!isVisible && menuRef.current) {
        gsap.to(menuRef.current, {
            height: 0,
            opacity: 0,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
                if (menuRef.current) {
                    menuRef.current.style.display = 'none';
                }
            },
        });
    }
};