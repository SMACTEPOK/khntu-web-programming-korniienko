import { useMemo } from 'react'
import PropTypes from 'prop-types'
import { CartContext } from './CartContext'
import { useCart } from '../hooks/useCart'

export function CartProvider({ children }) {
  const { items, totalCount, totalPrice, isEmpty, addItem, updateQuantity, removeItem, clearCart, applyPromo, promoCode } = useCart()

  const value = useMemo(
    () => ({ items, totalCount, totalPrice, isEmpty, addItem, updateQuantity, removeItem, clearCart, applyPromo, promoCode }),
    [items, totalCount, totalPrice, isEmpty, addItem, updateQuantity, removeItem, clearCart, applyPromo, promoCode]
  )

  return <CartContext value={value}>{children}</CartContext>
}
CartProvider.propTypes = { children: PropTypes.node.isRequired }
