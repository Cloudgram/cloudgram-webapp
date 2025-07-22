import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@app/styles/index.css';
import App from '@app/App';
import { ChakraUIProvider } from '@app/providers/CharkaUIProvider';
import { QueryStoreProvider } from '@app/providers/QueryStoreProvider';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ChakraUIProvider>
            <QueryStoreProvider>
                <App />
            </QueryStoreProvider>
        </ChakraUIProvider>
    </StrictMode>
);
