import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

if (window.Telegram && window.Telegram.WebApp) {
    window.Telegram.WebApp.expand();
    window.Telegram.WebApp.disableVerticalSwipes();
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App/>);
