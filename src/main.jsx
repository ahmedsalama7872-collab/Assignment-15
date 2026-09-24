import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ContextProvider from './components/UserContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
  <App />
</ContextProvider>
    
  </StrictMode>,
)
