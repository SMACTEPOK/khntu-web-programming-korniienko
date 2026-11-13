export class ApiError extends Error {
  constructor(message, status) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function fetchProducts({ signal } = {}) {
  const response = await fetch('/api/products', { signal })
  if (!response.ok) throw new ApiError(`Статус ${response.status}`, response.status)
  return response.json()
}

export async function fetchMaterials({ signal } = {}) {
  const response = await fetch('/api/materials', { signal })
  if (!response.ok) throw new ApiError(`Статус ${response.status}`, response.status)
  return response.json()
}

export async function fetchReviews(productId, { signal } = {}) {
  const response = await fetch(`/api/products/${productId}/reviews`, { signal })
  if (!response.ok) throw new ApiError(`Статус ${response.status}`, response.status)
  return response.json()
}
