import { z } from 'zod'

export const promoCodeSchema = z.object({
  promoCode: z
    .string()
    .regex(/^[A-Z0-9]{6,10}$/, 'Промокод має містити 6-10 великих латинських літер та цифр'),
})
