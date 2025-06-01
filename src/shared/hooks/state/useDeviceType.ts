import { useState, useLayoutEffect } from 'react';

export const useDeviceType = (breakpoint: number = 768) => {
    const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

    useLayoutEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= breakpoint);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [breakpoint]);

    return isMobile;
};
