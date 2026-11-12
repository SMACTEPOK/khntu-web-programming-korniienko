import { useContext } from 'react'
import { CartContext } from './CartContext'

export function useCartContext() {
  const context = useContext(CartContext)
  if (context === null) {
    throw new Error('useCartContext має викликатися всередині <CartProvider>')
  }
  return context
}
