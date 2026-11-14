import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router/dom'
import { router } from './router'
import { AuthProvider } from './context/AuthContext'
import { DeliveryCityProvider } from './context/DeliveryCityProvider'
import { NotificationProvider } from './context/NotificationProvider'
import './index.css'

async function enableMocking() {
  if (import.meta.env.PROD) return
  const { worker } = await import('./mocks/browser')
  return worker.start({ onUnhandledRequest: 'bypass' })
}

enableMocking().then(() => {
  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <AuthProvider>
        <DeliveryCityProvider>
          <NotificationProvider>
            <RouterProvider router={router} />
          </NotificationProvider>
        </DeliveryCityProvider>
      </AuthProvider>
    </StrictMode>,
  )
})
