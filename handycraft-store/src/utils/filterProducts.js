/**
 * Фільтрує масив товарів за пошуковим запитом (без урахування регістру).
 * 
 * @param {Array<Object>} products - Масив об'єктів товарів для фільтрації.
 * @param {string} query - Пошуковий запит користувача.
 * @returns {Array<Object>} Новий масив, що містить лише товари, назви яких відповідають запиту.
 * 
 * @example
 * // Вхідні дані:
 * const products = [{ name: 'Ваза' }, { name: 'Миска' }];
 * // Виклик:
 * filterProducts(products, 'ваз');
 * // Очікуваний вихід:
 * // [{ name: 'Ваза' }]
 * 
 * @example
 * // Вхідні дані:
 * filterProducts(products, '');
 * // Очікуваний вихід:
 * // [{ name: 'Ваза' }, { name: 'Миска' }] (повертає всі товари)
 */
export function filterProducts(products, query) {
  if (!query) return products;
  
  const normalizedQuery = query.toLowerCase();
  
  return products.filter((product) =>
    product.name.toLowerCase().includes(normalizedQuery)
  );
}
