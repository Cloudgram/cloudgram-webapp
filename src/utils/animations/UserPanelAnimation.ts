import gsap from 'gsap';

export const animateUserPanel = (ref: React.RefObject<HTMLDivElement>, isVisible: boolean) => {
    if (isVisible && ref.current) {
        ref.current.style.display = 'block';
        gsap.fromTo(
            ref.current,
            {
                height: 0,
                opacity: 0,
                y: -20,
                transformOrigin: 'top',
            },
            {
                height: 'auto',
                opacity: 1,
                y: 0,
                duration: 0.3,
                ease: 'power2.out',
            }
        );
    } else if (!isVisible && ref.current) {
        gsap.to(ref.current, {
            height: 0,
            opacity: 0,
            y: -20,
            duration: 0.2,
            ease: 'power2.in',
            onComplete: () => {
                if (ref.current) {
                    ref.current.style.display = 'none';
                }
            },
        });
    }
};
