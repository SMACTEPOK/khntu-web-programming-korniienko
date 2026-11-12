export const CART_ACTIONS = Object.freeze({
  ADD_ITEM: 'cart/addItem',
  REMOVE_ITEM: 'cart/removeItem',
  UPDATE_QUANTITY: 'cart/updateQuantity',
  CLEAR: 'cart/clear',
  APPLY_PROMO: 'cart/applyPromo',
})

export const initialCartState = Object.freeze({
  items: [],
  promoCode: null,
})

export function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM: {
      const { product, quantity = 1 } = action.payload
      const exists = state.items.some((item) => item.id === product.id)
      const currentQty = exists ? state.items.find((i) => i.id === product.id).quantity : 0
      
      // Перевірка залишку (Варіант 9)
      const newQty = currentQty + quantity
      if (newQty > product.stock) {
         // Додаємо скільки можемо, або взагалі не додаємо (тут додаємо до максимуму)
         const allowedQty = product.stock - currentQty
         if (allowedQty <= 0) return state
         return cartReducer(state, { ...action, payload: { product, quantity: allowedQty } })
      }

      if (exists) {
        return {
          ...state,
          items: state.items.map((item) =>
            item.id === product.id ? { ...item, quantity: newQty } : item
          ),
        }
      }

      const newItem = {
        id: product.id,
        title: product.name,
        price: product.price,
        image: product.image,
        category: product.category, // Зберігаємо категорію (Варіант 4)
        stock: product.stock,       // Зберігаємо залишок (Варіант 9)
        quantity,
      }
      return { ...state, items: [...state.items, newItem] }
    }

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload.id),
      }

    case CART_ACTIONS.UPDATE_QUANTITY: {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        return { ...state, items: state.items.filter((item) => item.id !== id) }
      }
      
      const item = state.items.find((i) => i.id === id)
      if (item && quantity > item.stock) {
        return state // Не дозволяємо перевищити залишок
      }

      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity } : item
        ),
      }
    }

    case CART_ACTIONS.CLEAR:
      return initialCartState

    case CART_ACTIONS.APPLY_PROMO: {
      const { code } = action.payload
      if (code === 'CERAMICS15') {
        return { ...state, promoCode: code }
      }
      return state // Неправильний код ігнорується
    }

    default:
      throw new Error(`Невідома дія кошика: ${action.type}`)
  }
}
