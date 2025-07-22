import { Provider } from 'react-redux';
import { store } from '@app/store/store';

interface AppProviderProps {
    children: React.ReactNode;
}

export const QueryStoreProvider = ({ children }: AppProviderProps) => {
    return <Provider store={store}>{children}</Provider>;
};
