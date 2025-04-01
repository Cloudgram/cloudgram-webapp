import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom'
import './App.css'
import { MainPage, AuthPage } from './index'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './api/queryClient'

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to="/auth" replace />} />
                    <Route path="/auth" element={<AuthPage />} />
                    <Route path="/folder/:folderId" element={<MainPage />} />
                </Routes>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App
