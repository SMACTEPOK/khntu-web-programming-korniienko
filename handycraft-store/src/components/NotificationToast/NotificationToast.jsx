import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react'
import { useNotificationContext } from '../../context/useNotificationContext'

export default function NotificationToast() {
  const { notifications, removeNotification } = useNotificationContext()

  if (notifications.length === 0) return null

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {notifications.map((n) => (
        <div key={n.id} className="flex items-start gap-3 bg-surface text-white border-2 border-border p-4 font-mono text-sm shadow-brutal max-w-sm animate-in slide-in-from-right">
          {n.type === 'success' && <CheckCircle2 className="w-5 h-5 text-accent shrink-0" />}
          {n.type === 'error' && <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />}
          {n.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}
          <span className="flex-1 break-words whitespace-pre-wrap">{n.message}</span>
          <button onClick={() => removeNotification(n.id)} className="text-muted hover:text-white shrink-0 mt-0.5">
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
