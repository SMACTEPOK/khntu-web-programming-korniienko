import { useCartStore } from '../store/cartStore'
import {
  selectItems,
  selectTotalCount,
  selectTotalPrice,
  selectIsEmpty,
  selectPromoCode,
} from '../store/cartSelectors'

export function useCart() {
  const items = useCartStore(selectItems)
  const totalCount = useCartStore(selectTotalCount)
  const totalPrice = useCartStore(selectTotalPrice)
  const isEmpty = useCartStore(selectIsEmpty)
  const promoCode = useCartStore(selectPromoCode)

  const addItem = useCartStore((s) => s.addItem)
  const incrementItem = useCartStore((s) => s.incrementItem)
  const decrementItem = useCartStore((s) => s.decrementItem)
  const updateQuantity = useCartStore((s) => s.updateQuantity)
  const removeItem = useCartStore((s) => s.removeItem)
  const clearCart = useCartStore((s) => s.clearCart)
  const applyPromo = useCartStore((s) => s.applyPromo)

  return {
    items, totalCount, totalPrice, isEmpty, promoCode,
    addItem, incrementItem, decrementItem, updateQuantity, removeItem, clearCart, applyPromo,
  }
}
