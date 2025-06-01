import { createRoot } from 'react-dom/client';
import '@app/styles/index.css';
import App from '@app/App';
import { StoreProvider } from '@app/store/providers/StoreProvider';
import { QueryProvider } from '@app/providers';
import { RouterProvider } from '@app/providers';

const container = document.getElementById('root');
if (!container) {
    throw new Error('Контейнер root не найден. Не удалось вмонтировать приложение.');
}
const root = createRoot(container);

root.render(
    <StoreProvider>
        <QueryProvider>
            <RouterProvider>
                <App />
            </RouterProvider>
        </QueryProvider>
    </StoreProvider>
);
