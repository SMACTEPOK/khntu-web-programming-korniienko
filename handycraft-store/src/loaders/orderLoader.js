export async function orderLoader({ params, request }) {
  // Варіант 9: передаємо request.signal для скасування
  const response = await fetch(`/api/orders/${encodeURIComponent(params.orderId)}`, { signal: request.signal })
  if (response.status === 404) throw new Response("Замовлення не знайдено", { status: 404 })
  if (!response.ok) throw new Response("Помилка сервера", { status: response.status })
  return response.json()
}
