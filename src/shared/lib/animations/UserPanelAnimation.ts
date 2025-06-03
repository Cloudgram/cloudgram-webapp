import gsap from 'gsap';

export const animateUserPanel = (ref: React.RefObject<HTMLDivElement>, isVisible: boolean) => {
    if (isVisible && ref.current) {
        ref.current.style.display = 'block';
        gsap.fromTo(
            ref.current,
            {
                opacity: 0,
                y: -20,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.3,
                // ease: 'power2.out',
            }
        );
    }
};
