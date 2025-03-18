import { Route, Routes, BrowserRouter } from 'react-router-dom'
import './App.css'
import { MainPage } from '../pages/Main/MainPage'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App
