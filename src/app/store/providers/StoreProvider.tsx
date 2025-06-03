import { Provider } from 'react-redux';
import { store } from '@app/store/config/store';

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
    return <Provider store={store}>{children}</Provider>;
};
