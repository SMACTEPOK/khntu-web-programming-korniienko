import { useCallback, useEffect, useState } from 'react'
import { fetchMaterials } from '../api/products'

export function useMaterials() {
  const [materials, setMaterials] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    const controller = new AbortController()
    fetchMaterials({ signal: controller.signal })
      .then(setMaterials)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err)
      })
      .finally(() => setIsLoading(false))
    return () => controller.abort()
  }, [attempt])

  const retry = useCallback(() => {
    setError(null)
    setIsLoading(true)
    setAttempt((v) => v + 1)
  }, [])

  return { materials, isLoading, error, retry }
}
