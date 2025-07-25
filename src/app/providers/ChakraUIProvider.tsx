// provider.tsx
import { ChakraProvider } from '@chakra-ui/react';
import { system } from '@shared/theme/theme';
import { ThemeProvider } from 'next-themes';

interface AppProviderProps {
    children: React.ReactNode;
}

export const ChakraUIProvider = ({ children }: AppProviderProps) => {
    return (
        <ThemeProvider
            attribute='data-theme'
            defaultTheme='light'
            enableSystem={true}
            themes={['light', 'dark']}
        >
            <ChakraProvider value={system}>{children}</ChakraProvider>
        </ThemeProvider>
    );
};
