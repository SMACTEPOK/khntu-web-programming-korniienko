import PropTypes from 'prop-types'
import ProductCard from '../ProductCard/ProductCard'
import './ProductList.css'

function ProductList({ products }) {
  if (products.length === 0) {
    return (
      <p className="product-list__empty-message">
        За заданими умовами пошуку товарів не знайдено.
      </p>
    )
  }

  return (
    <div className="product-list__grid">
      {products.map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      image: PropTypes.string,
      category: PropTypes.string,
      stock: PropTypes.number,
    })
  ).isRequired,
}

export default ProductList
