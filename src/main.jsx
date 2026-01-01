import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster 
      position='bottom-right'
      toastOptions={{
        // Define default options
        style: {
          background: '#0f1438',
          color: '#fff',
          border: '1px solid rgba(255,255,255,0.1)',
        },
        duration: 3000,
      }}
    />
  </StrictMode>,
)
