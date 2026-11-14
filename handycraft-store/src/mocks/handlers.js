import { http, HttpResponse, delay } from 'msw'
import { products } from './data/products'
import { mockOrders } from './data/orders'

const STORAGE_KEY = 'handycraft-mock'

function loadMockControl() {
  try {
    const saved = sessionStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : { delayMs: 800, failuresLeft: 0, failureMode: 'http' }
  } catch {
    return { delayMs: 800, failuresLeft: 0, failureMode: 'http' }
  }
}

export const mockControl = loadMockControl()

export function persistMockControl() {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(mockControl))
  } catch {
    // Ignore sessionStorage errors
  }
}

export const handlers = [
  http.get('/api/products', async () => {
    await delay(mockControl.delayMs)
    if (mockControl.failuresLeft > 0) {
      mockControl.failuresLeft -= 1
      persistMockControl()
      if (mockControl.failureMode === 'network') return HttpResponse.error()
      return HttpResponse.json({ message: 'Внутрішня помилка' }, { status: 500 })
    }
    return HttpResponse.json(products)
  }),
  http.get('/api/materials', async () => {
    await delay(mockControl.delayMs)
    if (mockControl.failuresLeft > 0) {
      mockControl.failuresLeft -= 1
      persistMockControl()
      return HttpResponse.json({ message: 'Помилка матеріалів' }, { status: 500 })
    }
    return HttpResponse.json(['Глина', 'Дерево', 'Текстиль', 'Скло', 'Метал'])
  }),
  http.get('/api/products/:id/reviews', async ({ params }) => {
    await delay(mockControl.delayMs)
    if (params.id === '1') {
      return HttpResponse.json([
        { id: 1, author: 'Олена', text: 'Чудова ваза!', rating: 5 },
        { id: 2, author: 'Іван', text: 'Гарна якість.', rating: 4 }
      ])
    }
    return HttpResponse.json([])
  }),
  http.get('/api/products/:id', async ({ params }) => {
    await delay(mockControl.delayMs)
    const product = products.find((item) => String(item.id) === params.id)
    if (!product) return HttpResponse.json({ message: 'Товар не знайдено' }, { status: 404 })
    return HttpResponse.json(product)
  }),
  http.get('/api/orders/:id', async ({ params }) => {
    await delay(1000)
    const order = mockOrders.find((o) => o.id === params.id)
    if (!order) return HttpResponse.json({ message: 'Замовлення не знайдено' }, { status: 404 })
    return HttpResponse.json(order)
  }),
]
