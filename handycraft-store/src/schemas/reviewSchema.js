import { z } from 'zod'

export const reviewSchema = z.object({
  authorName: z
    .string()
    .trim()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(50, "Ім'я не може перевищувати 50 символів"),
  rating: z
    .coerce
    .number({ invalid_type_error: 'Оберіть оцінку від 1 до 5' })
    .min(1, 'Мінімальна оцінка — 1')
    .max(5, 'Максимальна оцінка — 5'),
  reviewText: z
    .string()
    .trim()
    .min(10, 'Текст відгуку має містити щонайменше 10 символів')
    .max(500, 'Текст відгуку не може перевищувати 500 символів'),
})
