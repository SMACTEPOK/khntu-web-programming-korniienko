import PropTypes from 'prop-types'
import ProductCard from '../ProductCard/ProductCard'
import './ProductList.css'

function ProductList({ products, cart, onAddToCart }) {
  if (products.length === 0) {
    return <p className="product-list__empty-message">За заданими умовами пошуку товарів не знайдено.</p>
  }

  return (
    <div className="product-list__grid">
      {products.map((product) => {
        const cartItem = cart.items.find(i => i.id === product.id)
        return (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart}
            cartQuantity={cartItem ? cartItem.quantity : 0}
            promoCode={cart.promoCode}
          />
        )
      })}
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  cart: PropTypes.object.isRequired,
  onAddToCart: PropTypes.func.isRequired,
}

export default ProductList
