import { useCallback, useEffect, useState } from 'react'
import { fetchProducts } from '../api/products'

const initialState = { status: 'loading', products: [], error: null }

export function useProducts() {
  const [state, setState] = useState(initialState)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    fetchProducts({ signal: controller.signal })
      .then((products) => setState({ status: 'success', products, error: null }))
      .catch((error) => {
        if (error.name === 'AbortError') return
        setState({ status: 'error', products: [], error })
      })
    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setState(initialState)
    setAttempt((v) => v + 1)
  }, [])

  return { ...state, retry }
}
