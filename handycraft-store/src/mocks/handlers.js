import { http, HttpResponse, delay } from 'msw'
import { products } from './data/products'

// Варіант 4: Булева змінна для перемикання між успіхом та помилкою 500
// true - симулюємо помилку 500, false - повертаємо успішні дані
const SIMULATE_ERROR = false

export const handlers = [
  http.get('/api/products', async () => {
    await delay(600)

    if (SIMULATE_ERROR) {
      return HttpResponse.json(
        { message: 'Внутрішня помилка сервера' },
        { status: 500 }
      )
    }

    return HttpResponse.json(products)
  }),
]
