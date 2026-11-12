import { useCallback, useMemo, useReducer } from 'react'
import { CART_ACTIONS, cartReducer, initialCartState } from './cartReducer.js'
import { calculateDiscountedPrice } from '../utils/calculateDiscountedPrice.js'

export function useCart() {
  const [state, dispatch] = useReducer(cartReducer, initialCartState)

  const addItem = useCallback((product, quantity = 1) => {
    if (product.stock <= 0) return false
    dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } })
    return true
  }, [])

  const removeItem = useCallback((id) => {
    dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: { id } })
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { id, quantity } })
  }, [])

  const clearCart = useCallback(() => {
    dispatch({ type: CART_ACTIONS.CLEAR })
  }, [])

  const applyPromo = useCallback((code) => {
    dispatch({ type: CART_ACTIONS.APPLY_PROMO, payload: { code } })
  }, [])

  const totals = useMemo(() => {
    let totalCount = 0
    let totalPrice = 0
    for (const item of state.items) {
      totalCount += item.quantity
      // Використовуємо нашу утиліту для розрахунку ціни зі знижкою (Варіант 14)
      const finalPrice = calculateDiscountedPrice(item.price, item.category, state.promoCode)
      totalPrice += finalPrice * item.quantity
    }
    return { totalCount, totalPrice }
  }, [state.items, state.promoCode])

  return {
    items: state.items,
    promoCode: state.promoCode,
    totalCount: totals.totalCount,
    totalPrice: totals.totalPrice,
    isEmpty: state.items.length === 0,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyPromo,
  }
}
