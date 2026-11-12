import PropTypes from 'prop-types'
import { CATEGORIES } from '@config/categories'
import AddToCartForm from './AddToCartForm'
import './product-card.css'

const PLACEHOLDER_IMAGE = '/src/assets/product-placeholder.svg'

function ProductCard({ name, price, image, category, stock = 0 }) {
  const imageSrc = image || PLACEHOLDER_IMAGE
  const isHandmade = category === CATEGORIES.WOOD
  const isAvailable = stock > 0

  return (
    <article className="product-card">
      <img className="product-card__image" src={imageSrc} alt={name} />
      <div className="product-card__content">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">{price} грн</p>
        <p className="product-card__category">{category || 'Без категорії'}</p>
        
        <div className="product-card__badges">
          <span className={`product-card__badge ${isAvailable ? 'product-card__badge--in' : 'product-card__badge--out'}`}>
            {isAvailable ? `В наявності: ${stock} шт.` : 'Немає в наявності'}
          </span>
          {isHandmade && (
            <span className="product-card__badge product-card__badge--handmade">
              Хендмейд
            </span>
          )}
        </div>

        {/* Форма тепер рендериться для всіх товарів */}
        <AddToCartForm productName={name} maxQuantity={stock} />
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  category: PropTypes.string,
  stock: PropTypes.number,
}

export default ProductCard
