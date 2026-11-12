import { http, HttpResponse, delay } from 'msw'
import { products } from './data/products'

const SIMULATE_ERROR = false

export const handlers = [
  http.get('/api/products', async () => {
    await delay(600)
    if (SIMULATE_ERROR) {
      return HttpResponse.json({ message: 'Внутрішня помилка сервера' }, { status: 500 })
    }
    return HttpResponse.json(products)
  }),

  // Обробник для форми відгуку (Варіант 14)
  http.post('/api/reviews', async ({ request }) => {
    await delay(1000) // Імітація затримки відправки
    const newReview = await request.json()

    // Імітуємо помилку сервера, якщо оцінка 1
    if (newReview.rating === 1) {
      return HttpResponse.json(
        { message: 'Сервер відхилив відгук з оцінкою 1' },
        { status: 500 }
      )
    }

    return HttpResponse.json({ ...newReview, id: Date.now() }, { status: 201 })
  }),
]
