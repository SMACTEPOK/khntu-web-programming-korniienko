import { http, HttpResponse, delay } from 'msw'
import { products } from './data/products'
import { mockOrders } from './data/orders'

export const handlers = [
  http.get('/api/products', async () => {
    await delay(400)
    return HttpResponse.json(products)
  }),
  // Обробник для одного товару
  http.get('/api/products/:id', async ({ params }) => {
    await delay(400)
    const product = products.find((item) => String(item.id) === String(params.id))
    if (!product) {
      return HttpResponse.json({ message: 'Товар не знайдено' }, { status: 404 })
    }
    return HttpResponse.json(product)
  }),
  http.get('/api/orders/:id', async ({ params }) => {
    await delay(2000) 
    const order = mockOrders.find((o) => o.id === params.id)
    if (!order) {
      return HttpResponse.json({ message: 'Замовлення не знайдено' }, { status: 404 })
    }
    return HttpResponse.json(order)
  }),
]
