import { useContext } from 'react'
import { NotificationContext } from './NotificationContext'

export function useNotificationContext() {
  const context = useContext(NotificationContext)
  if (context === null) throw new Error('useNotificationContext має викликатися всередині <NotificationProvider>')
  return context
}
