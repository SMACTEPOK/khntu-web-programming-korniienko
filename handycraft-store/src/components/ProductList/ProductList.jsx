import { useState } from 'react'
import PropTypes from 'prop-types'
import ProductCard from '../ProductCard/ProductCard'
import ProductModal from '../ProductModal/ProductModal'

function ProductList({ products, searchQuery }) {
  const [selectedProduct, setSelectedProduct] = useState(null)

  if (products.length === 0) {
    return <p className="p-10 text-center text-muted font-mono border-2 border-dashed border-border mt-8">За заданими умовами пошуку товарів не знайдено.</p>
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 mt-8">
        {products.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            searchQuery={searchQuery} 
            onOpenDetails={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal 
          product={selectedProduct} 
          onClose={() => setSelectedProduct(null)} 
        />
      )}
    </>
  )
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  searchQuery: PropTypes.string,
}

export default ProductList
