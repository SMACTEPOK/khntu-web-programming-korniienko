import { useState, useEffect } from 'react'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import ProductCard from '../components/ProductCard/ProductCard'
import { mockProducts } from '../data/mockProducts'
import { filterProducts } from '../utils/filterProducts'
import './CatalogPage.css'

function CatalogPage() {
  // Миттєвий стан для поля вводу
  const [searchQuery, setSearchQuery] = useState('')
  // Стан із затримкою для фільтрації (debounce)
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)

  // Ефект для debounce (затримка 300 мс)
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    // Очищення таймера при наступному введенні або розмонтуванні
    return () => clearTimeout(timerId)
  }, [searchQuery])

  // Використовуємо нашу утиліту (Варіант 14)
  const filteredProducts = filterProducts(mockProducts, debouncedQuery)

  // Беремо назву першого товару як підказку (Варіант 4)
  const hintText = mockProducts[0].name

  return (
    <div className="catalog-page">
      <SearchPanel 
        value={searchQuery} 
        onChange={setSearchQuery} 
        hint={hintText} 
      />
      
      <p className="catalog-page__results-count">
        Знайдено товарів: {filteredProducts.length}
      </p>

      {filteredProducts.length === 0 ? (
        <p className="catalog-page__empty-message">
          За запитом «{debouncedQuery}» нічого не знайдено. Спробуйте інше формулювання.
        </p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CatalogPage
