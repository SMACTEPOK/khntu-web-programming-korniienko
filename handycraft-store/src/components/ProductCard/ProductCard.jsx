import PropTypes from 'prop-types'
import './product-card.css'

const PLACEHOLDER_IMAGE = '/src/assets/product-placeholder.svg'

/**
 * @param {Object} props
 * @param {string} props.name
 * @param {number} props.price
 * @param {string} [props.image]
 * @param {string} props.category
 * @param {boolean} [props.inStock=true]
 * @param {boolean} props.isHandmade
 */
function ProductCard({ name, price, image, category, inStock = true, isHandmade }) {
  const imageSrc = image || PLACEHOLDER_IMAGE

  return (
    <article className="product-card">
      <img className="product-card__image" src={imageSrc} alt={name} />
      <div className="product-card__content">
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">{price} грн</p>
        <p className="product-card__category">{category}</p>
        
        {/* Бейдж відсутності на складі */}
        {!inStock && (
          <span className="product-card__badge product-card__badge--out">
            Немає в наявності
          </span>
        )}

        {/* Новий бейдж Хендмейд (Варіант 4) */}
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
  category: PropTypes.string.isRequired,
  inStock: PropTypes.bool,
  isHandmade: PropTypes.bool.isRequired, // Обов'язковий проп згідно з варіантом
}

export default ProductCard