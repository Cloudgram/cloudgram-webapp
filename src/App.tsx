import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import './App.css'
import { MainPage, AuthPage } from './index'
import { QueryClientProvider } from '@tanstack/react-query'
// import { Provider } from 'react-redux'
import { queryClient } from './api/queryClient'
import { AuthGuard } from './pages/Auth/AuthGuard'
// import { store } from './store/store'

function App() {
    return (
        // <Provider store={store}>
        // </Provider>
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/session" replace />} />
                    <Route path="/session" element={<AuthGuard />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/folder/:folderId" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
