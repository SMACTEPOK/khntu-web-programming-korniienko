import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import PropTypes from 'prop-types'
import { clearSession, loadSession, loginRequest, saveSession } from '../services/authService'
import { useCartStore } from '../store/cartStore'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => loadSession())

  const login = useCallback(async (credentials) => {
    const data = await loginRequest(credentials)
    saveSession(data)
    setSession(data)
    // Варіант 14: Відновлюємо кошик користувача
    useCartStore.getState().loadCart(data.user.id)
  }, [])

  const logout = useCallback(() => {
    if (session?.user) {
      // Варіант 14: Зберігаємо кошик перед виходом
      useCartStore.getState().saveCart(session.user.id)
    }
    clearSession()
    setSession(null)
    // Варіант 14: Очищаємо кошик в пам'яті
    useCartStore.getState().clearCart()
  }, [session])

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session?.token),
      login,
      logout,
    }),
    [session, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

AuthProvider.propTypes = { children: PropTypes.node.isRequired }

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth потрібно викликати всередині AuthProvider')
  }
  return context
}
