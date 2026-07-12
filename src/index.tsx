import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { setupIonicReact } from '@ionic/react'
import App from './app/App'
import { registerPwaUpdates } from './lib/pwa'
import './styles.css'

setupIonicReact()

const root = document.getElementById('root')

if (!root) {
  throw new Error('App root element was not found.')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
registerPwaUpdates()
