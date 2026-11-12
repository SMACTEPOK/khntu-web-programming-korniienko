import PropTypes from 'prop-types'
import ProductCard from '../ProductCard/ProductCard'

function ProductList({ products, searchQuery }) {
  if (products.length === 0) {
    return <p className="p-10 text-center text-muted font-mono border-2 border-dashed border-border mt-8">За заданими умовами пошуку товарів не знайдено.</p>
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-7 mt-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} searchQuery={searchQuery} />
      ))}
    </div>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchQuery: PropTypes.string,
}

export default ProductList
