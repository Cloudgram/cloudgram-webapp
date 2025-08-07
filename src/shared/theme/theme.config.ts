type ColorMode = 'light' | 'dark' | 'system';

interface ThemeConfig {
    initialColorMode: ColorMode;
    useSystemColorMode: boolean;
}

export const config: ThemeConfig = {
    initialColorMode: 'system',
    useSystemColorMode: true,
};
