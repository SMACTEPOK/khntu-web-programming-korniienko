import { CATEGORIES } from '../config/categories'

/**
 * Розраховує ціну з урахуванням промокоду.
 * @param {number} price - Базова ціна
 * @param {string} category - Категорія товару
 * @param {string|null} promoCode - Активний промокод
 * @returns {number} Фінальна ціна
 */
export function calculateDiscountedPrice(price, category, promoCode) {
  if (promoCode === 'CERAMICS15' && category === CATEGORIES.CERAMICS) {
    return price * 0.85
  }
  return price
}
