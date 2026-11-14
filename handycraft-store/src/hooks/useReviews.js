import { useEffect, useState } from 'react'
import { fetchReviews } from '../api/products'

export function useReviews(productId) {
  const [reviews, setReviews] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()
    
    // Свідомо скидаємо стан перед новим запитом (потрібно для коректного UI).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true)
    setError(null)
    
    fetchReviews(productId, { signal: controller.signal })
      .then(setReviews)
      .catch((err) => {
        if (err.name !== 'AbortError') setError(err)
      })
      .finally(() => setIsLoading(false))
      
    return () => controller.abort()
  }, [productId])

  return { reviews, isLoading, error }
}