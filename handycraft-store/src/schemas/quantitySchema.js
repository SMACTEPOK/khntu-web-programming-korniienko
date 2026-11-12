import { z } from 'zod'

export const quantitySchema = z.object({
  quantity: z
    .coerce
    .number({ invalid_type_error: 'Введіть число' })
    .int('Кількість має бути цілим числом (без дробової частини)')
    .min(1, 'Мінімальна кількість — 1')
    .max(20, 'Максимальна кількість — 20'),
})
