import { useState, useEffect, useMemo } from 'react'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import SortControls from '../components/SortControls/SortControls'
import ProductList from '../components/ProductList/ProductList'
import ReviewForm from '../components/ReviewForm/ReviewForm'
import { filterProducts } from '../utils/filterProducts'
import './CatalogPage.css'

function CatalogPage({ cart }) {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [reviews, setReviews] = useState([])

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)
  const [sortConfig, setSortConfig] = useState({ field: 'category', direction: 'asc' })

  useEffect(() => {
    let isActive = true
    async function loadProducts() {
      setIsLoading(true)
      try {
        const response = await fetch('/api/products')
        if (!response.ok) throw new Error(`Сервер повернув статус ${response.status}`)
        const data = await response.json()
        if (isActive) setProducts(data)
      } catch (err) {
        if (isActive) setError(err.message)
      } finally {
        if (isActive) setIsLoading(false)
      }
    }
    loadProducts()
    return () => { isActive = false }
  }, [])

  useEffect(() => {
    const timerId = setTimeout(() => setDebouncedQuery(searchQuery), 300)
    return () => clearTimeout(timerId)
  }, [searchQuery])

  const sortedAndFilteredProducts = useMemo(() => {
    const filtered = filterProducts(products, debouncedQuery)
    return [...filtered].sort((a, b) => {
      const catA = a.category || ''
      const catB = b.category || ''
      if (sortConfig.field === 'category') {
        if (!catA && !catB) return 0
        if (!catA) return 1
        if (!catB) return -1
        const comparison = catA.localeCompare(catB, 'uk')
        return sortConfig.direction === 'asc' ? comparison : -comparison
      }
      const valueA = a[sortConfig.field] || ''
      const valueB = b[sortConfig.field] || ''
      if (typeof valueA === 'string' && typeof valueB === 'string') {
        const comparison = valueA.localeCompare(valueB, 'uk')
        return sortConfig.direction === 'asc' ? comparison : -comparison
      }
      if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1
      if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1
      return 0
    })
  }, [products, debouncedQuery, sortConfig])

  const hintText = products.length > 0 ? products[0].name : ''

  if (isLoading) return <p className="catalog-page__status-message">Завантаження каталогу…</p>
  if (error) return <p className="catalog-page__error-message" role="alert">Не вдалося завантажити каталог: {error}</p>

  return (
    <div className="catalog-page">
      <div className="catalog-page__controls">
        <SearchPanel value={searchQuery} onChange={setSearchQuery} hint={hintText} />
        <SortControls sortConfig={sortConfig} onSortChange={setSortConfig} />
      </div>
      
      <p className="catalog-page__results-count">Знайдено товарів: {sortedAndFilteredProducts.length}</p>
      
      <ProductList products={sortedAndFilteredProducts} cart={cart} onAddToCart={cart.addItem} />

      <div className="catalog-page__forms-section">
        <h2 className="catalog-page__forms-title">Взаємодія з магазином</h2>
        {/* Форму промокоду прибрано, вона тепер в кошику */}
        <ReviewForm onReviewSubmit={(review) => setReviews((prev) => [...prev, review])} />
        
        {reviews.length > 0 && (
          <p className="catalog-page__reviews-count">Додано відгуків: {reviews.length}</p>
        )}
      </div>
    </div>
  )
}

export default CatalogPage
