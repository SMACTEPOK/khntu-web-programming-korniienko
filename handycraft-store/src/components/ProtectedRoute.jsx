import { Navigate, Outlet, useLocation } from 'react-router'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth()
  const location = useLocation()

  if (!isAuthenticated) {
    // Варіант 9: Передаємо повний шлях із query та hash
    const fullPath = location.pathname + location.search + location.hash
    return <Navigate to="/login" replace state={{ from: fullPath }} />
  }

  return <Outlet />
}
