import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';

interface AppProviderProps {
    children: React.ReactNode;
}

export const ChakraUIProvider = ({ children }: AppProviderProps) => {
    return (
        <ThemeProvider attribute='class' defaultTheme='white' enableSystem>
            <ChakraProvider value={defaultSystem} children={children} />
        </ThemeProvider>
    );
};
