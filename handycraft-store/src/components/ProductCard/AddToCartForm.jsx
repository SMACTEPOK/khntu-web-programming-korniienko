import { useState } from 'react'
import './AddToCartForm.css'

function AddToCartForm({ productName, maxQuantity }) {
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  
  const isOutOfStock = maxQuantity === 0

  const handleIncrement = () => {
    if (quantity < maxQuantity) setQuantity(prev => prev + 1)
  }

  const handleDecrement = () => {
    if (quantity > 1) setQuantity(prev => prev - 1)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isOutOfStock) return
    
    console.log(`Додано ${quantity} шт. товару "${productName}" у кошик`)
    setIsAdded(true)
    setTimeout(() => {
      setIsAdded(false)
      setQuantity(1)
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="add-to-cart">
      <div className="add-to-cart__group">
        <button 
          type="button" 
          onClick={handleDecrement} 
          className="add-to-cart__btn-qty" 
          disabled={quantity <= 1 || isAdded || isOutOfStock}
        >
          -
        </button>
        <span className="add-to-cart__value">{isOutOfStock ? 0 : quantity}</span>
        <button 
          type="button" 
          onClick={handleIncrement} 
          className="add-to-cart__btn-qty" 
          disabled={quantity >= maxQuantity || isAdded || isOutOfStock}
        >
          +
        </button>
        <button 
          type="submit" 
          className="add-to-cart__submit" 
          disabled={isAdded || isOutOfStock}
        >
          {isAdded ? 'Додано!' : (isOutOfStock ? 'Немає' : 'Додати')}
        </button>
      </div>
    </form>
  )
}

export default AddToCartForm
