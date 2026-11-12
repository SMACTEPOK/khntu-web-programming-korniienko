import PropTypes from 'prop-types'
import { CATEGORIES } from '@config/categories'
import { calculateDiscountedPrice } from '../../utils/calculateDiscountedPrice'
import { formatPrice } from '../../utils/formatPrice'
import { useCartContext } from '../../context/useCartContext'
import { useNotificationContext } from '../../context/useNotificationContext'
import './product-card.css'

const PLACEHOLDER_IMAGE = '/src/assets/product-placeholder.svg'

function ProductCard({ product }) {
  const { items, addItem, promoCode } = useCartContext()
  const { addNotification } = useNotificationContext()

  const { name, price, image, category, stock = 0 } = product
  const imageSrc = image || PLACEHOLDER_IMAGE
  const isHandmade = category === CATEGORIES.WOOD
  const isAvailable = stock > 0

  const cartItem = items.find((i) => i.id === product.id)
  const cartQuantity = cartItem ? cartItem.quantity : 0
  const isMaxInCart = cartQuantity >= stock

  const finalPrice = calculateDiscountedPrice(price, category, promoCode)
  const hasDiscount = finalPrice < price

  const handleAdd = () => {
    addItem(product)
    addNotification(`Товар "${name}" додано в кошик!`)
  }

  return (
    <article className="product-card">
      <img className="product-card__image" src={imageSrc} alt={name} />
      <div className="product-card__content">
        <h3 className="product-card__name">{name}</h3>
        
        <div className="product-card__price-wrap">
          {hasDiscount ? (
            <>
              <p className="product-card__price product-card__price--old">{formatPrice(price)}</p>
              <p className="product-card__price">{formatPrice(finalPrice)}</p>
            </>
          ) : (
            <p className="product-card__price">{formatPrice(price)}</p>
          )}
        </div>

        <p className="product-card__category">{category || 'Без категорії'}</p>
        
        <div className="product-card__badges">
          <span className={`product-card__badge ${isAvailable ? 'product-card__badge--in' : 'product-card__badge--out'}`}>
            {isAvailable ? `В наявності: ${stock} шт.` : 'Немає в наявності'}
          </span>
          {isHandmade && <span className="product-card__badge product-card__badge--handmade">Хендмейд</span>}
          {cartQuantity > 0 && <span className="product-card__badge product-card__badge--incart">У кошику: {cartQuantity}</span>}
        </div>

        <button 
          type="button" 
          className="product-card__add-btn"
          disabled={!isAvailable || isMaxInCart}
          onClick={handleAdd}
        >
          {!isAvailable ? 'Немає' : (isMaxInCart ? 'Максимум' : 'До кошика')}
        </button>
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
}

export default ProductCard
