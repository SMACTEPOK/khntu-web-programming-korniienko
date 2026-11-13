export async function productLoader({ params, request }) {
  const response = await fetch(`/api/products/${encodeURIComponent(params.productId)}`, { signal: request.signal })
  
  if (response.status === 404) {
    throw new Response("Товар не знайдено", { status: 404 })
  }
  if (!response.ok) {
    throw new Response("Помилка сервера", { status: response.status })
  }
  return response.json()
}
