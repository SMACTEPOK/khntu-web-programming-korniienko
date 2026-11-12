import { useState } from 'react'
import PropTypes from 'prop-types'
import CartItem from '../CartItem/CartItem'
import { formatPrice } from '../../utils/formatPrice'
import './CartPage.css'

export default function CartPage({ cart }) {
  const { items, totalCount, totalPrice, isEmpty, updateQuantity, removeItem, clearCart, applyPromo, promoCode } = cart
  const [inputCode, setInputCode] = useState('')

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
      
      <ul className="cart-page__list">
        {items.map((item) => (
          <CartItem key={item.id} item={item} onQuantityChange={updateQuantity} onRemove={removeItem} />
        ))}
      </ul>

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
        <p>Разом: <strong>{formatPrice(totalPrice)}</strong></p>
        <button type="button" className="cart-page__clear" onClick={clearCart}>
          Очистити кошик
        </button>
      </div>
    </section>
  )
}

CartPage.propTypes = {
  cart: PropTypes.shape({
    items: PropTypes.arrayOf(PropTypes.object).isRequired,
    totalCount: PropTypes.number.isRequired,
    totalPrice: PropTypes.number.isRequired,
    isEmpty: PropTypes.bool.isRequired,
    updateQuantity: PropTypes.func.isRequired,
    removeItem: PropTypes.func.isRequired,
    clearCart: PropTypes.func.isRequired,
    applyPromo: PropTypes.func.isRequired,
    promoCode: PropTypes.string,
  }).isRequired,
}
