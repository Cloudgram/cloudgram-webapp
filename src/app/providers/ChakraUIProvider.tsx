// provider.tsx
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/color-mode';
import { system } from '@shared/theme/theme';
import { config } from '@shared/theme/theme.config';

interface AppProviderProps {
    children: React.ReactNode;
}

export const ChakraUIProvider = ({ children }: AppProviderProps) => {
    return (
        <ChakraProvider value={system}>
            <ColorModeScript initialColorMode={config.initialColorMode} />
            {children}
        </ChakraProvider>
    );
};
