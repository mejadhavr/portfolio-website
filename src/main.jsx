import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const initApp = () => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
};

// Immediate render
initApp();

const registerServiceWorker = () => {
  navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(() => {});
};

// Defer non-critical work
const deferWork = () => {
  if ('serviceWorker' in navigator) {
    if (document.readyState === 'complete') {
      registerServiceWorker();
      return;
    }

    window.addEventListener('load', registerServiceWorker, { once: true });
  }
};

if ('requestIdleCallback' in window) {
  window.requestIdleCallback(deferWork);
} else {
  setTimeout(deferWork, 2500);
}
