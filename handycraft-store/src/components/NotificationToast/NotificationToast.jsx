import { useNotificationContext } from '../../context/useNotificationContext'
import './NotificationToast.css'

export default function NotificationToast() {
  const { notifications, removeNotification } = useNotificationContext()

  if (notifications.length === 0) return null

  return (
    <div className="toast-container">
      {notifications.map((n) => (
        <div key={n.id} className="toast" role="alert">
          <span>{n.message}</span>
          <button onClick={() => removeNotification(n.id)}>✕</button>
        </div>
      ))}
    </div>
  )
}
