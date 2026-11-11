import PropTypes from 'prop-types'
import { CATEGORIES } from '@config/categories'
import './product-card.css'

const PLACEHOLDER_IMAGE = '/src/assets/product-placeholder.svg'

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {number} props.price
 * @param {string} [props.image]
 * @param {string} [props.category]
 * @param {boolean} [props.inStock=true]
 */
function ProductCard({ name, price, image, category, inStock = true }) {
  const imageSrc = image || PLACEHOLDER_IMAGE
  // Перевіряємо, чи належить товар до категорії ручної роботи
  const isHandmade = category === CATEGORIES.WOOD

  return (
    <article className="product-card">
      <img className="product-card__image" src={imageSrc} alt={name} />
      <div className="product-card__content">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">{price} грн</p>
        
        {/* Обробка відсутньої категорії (Варіант 9) */}
        <p className="product-card__category">
          {category || 'Без категорії'}
        </p>
        
        {!inStock && (
          <span className="product-card__badge product-card__badge--out">
            Немає в наявності
          </span>
        )}

        {/* Бейдж Хендмейд на основі категорії (Варіант 14) */}
        {isHandmade && (
          <span className="product-card__badge product-card__badge--handmade">
            Хендмейд
          </span>
        )}
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string,
  category: PropTypes.string, // Більше не isRequired (для Варіанту 9)
  inStock: PropTypes.bool,
}

export default ProductCard