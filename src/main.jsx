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

// Defer non-critical work
const deferWork = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js').catch(err => console.log('SW fail:', err));
  }
};

if ('requestIdleCallback' in window) {
  requestIdleCallback(deferWork);
} else {
  setTimeout(deferWork, 1500);
}
