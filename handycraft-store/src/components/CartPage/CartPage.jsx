import { useState, useMemo } from 'react'
import { useCartContext } from '../../context/useCartContext'
import { useDeliveryCityContext } from '../../context/useDeliveryCityContext'
import CartItem from '../CartItem/CartItem'
import { formatPrice } from '../../utils/formatPrice'
import './CartPage.css'

export default function CartPage() {
  const { items, totalCount, totalPrice, isEmpty, updateQuantity, removeItem, clearCart, applyPromo, promoCode } = useCartContext()
  const { city } = useDeliveryCityContext()
  const [inputCode, setInputCode] = useState('')

  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      const cat = item.category || 'Без категорії'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(item)
      return acc
    }, {})
  }, [items])

  const handleApplyPromo = (e) => {
    e.preventDefault()
    applyPromo(inputCode.trim().toUpperCase())
    setInputCode('')
  }

  if (isEmpty) {
    return (
      <section className="cart-page">
        <h2 className="cart-page__title">Кошик</h2>
        <p className="cart-page__empty">У кошику поки немає товарів.</p>
      </section>
    )
  }

  return (
    <section className="cart-page">
      <h2 className="cart-page__title">Кошик ({totalCount})</h2>
      
      <div className="cart-page__grouped-list">
        {Object.entries(groupedItems).map(([category, catItems]) => {
          const categorySubtotal = catItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
          return (
            <div key={category} className="cart-group">
              <div className="cart-group__header">
                <span>{category}</span>
                <span>{formatPrice(categorySubtotal)}</span>
              </div>
              <ul className="cart-page__list">
                {catItems.map((item) => (
                  <CartItem key={item.id} item={item} onQuantityChange={updateQuantity} onRemove={removeItem} />
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <form className="cart-page__promo" onSubmit={handleApplyPromo}>
        <input 
          type="text" 
          placeholder="Промокод (CERAMICS15)" 
          value={inputCode} 
          onChange={e => setInputCode(e.target.value)} 
        />
        <button type="submit">ОК</button>
      </form>
      {promoCode && <p className="cart-page__promo-active">Застосовано: {promoCode}</p>}

      <div className="cart-page__summary">
        <div className="cart-page__delivery">
          <span>Доставка до:</span> <strong>{city}</strong>
        </div>
        <div className="cart-page__total-row">
          <p>Разом: <strong>{formatPrice(totalPrice)}</strong></p>
          <button type="button" className="cart-page__clear" onClick={clearCart}>
            Очистити кошик
          </button>
        </div>
      </div>
    </section>
  )
}
