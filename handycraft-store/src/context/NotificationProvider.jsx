import { useState, useCallback, useRef, useMemo } from 'react'
import PropTypes from 'prop-types'
import { NotificationContext } from './NotificationContext'

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([])
  const timers = useRef({})

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
    if (timers.current[id]) {
      clearTimeout(timers.current[id])
      delete timers.current[id]
    }
  }, [])

  const addNotification = useCallback((message, type = 'success') => {
    const id = Date.now()
    setNotifications((prev) => [...prev, { id, message, type }])
    timers.current[id] = setTimeout(() => {
      removeNotification(id)
    }, 3000)
  }, [removeNotification])

  const value = useMemo(() => ({ notifications, addNotification, removeNotification }), [notifications, addNotification, removeNotification])

  return <NotificationContext value={value}>{children}</NotificationContext>
}
NotificationProvider.propTypes = { children: PropTypes.node.isRequired }
