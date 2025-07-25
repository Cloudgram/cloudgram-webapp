import { IconButton } from '@chakra-ui/react';
import { useTheme } from 'next-themes';
// import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
    const { theme, setTheme } = useTheme();

    return (
        <IconButton
            aria-label='Toggle theme'
            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        >
            {theme === 'light' ? '🌙' : '☀️'}
        </IconButton>
    );
};
