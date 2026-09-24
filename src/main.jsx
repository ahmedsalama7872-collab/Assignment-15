import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ContextProvider from './components/UserContext.jsx'
import {NotificationsProvider} from './components/NotificationContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <NotificationsProvider>
  <App />
      </NotificationsProvider>
</ContextProvider>
    
  </StrictMode>,
)
