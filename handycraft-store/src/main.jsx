import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { CartProvider } from './context/CartProvider'
import { DeliveryCityProvider } from './context/DeliveryCityProvider'
import { NotificationProvider } from './context/NotificationProvider'
import './index.css'

async function enableMocking() {
  if (import.meta.env.PROD) {
    return
  }
  const { worker } = await import('./mocks/browser')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <CartProvider>
        <DeliveryCityProvider>
          <NotificationProvider>
            <App />
          </NotificationProvider>
        </DeliveryCityProvider>
      </CartProvider>
    </StrictMode>,
  )
})
