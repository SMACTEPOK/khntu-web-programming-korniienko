import { useState, useEffect, useMemo } from 'react'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import SortControls from '../components/SortControls/SortControls'
import ProductList from '../components/ProductList/ProductList'
import { filterProducts } from '../utils/filterProducts'
import './CatalogPage.css'

function CatalogPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)
  const [sortConfig, setSortConfig] = useState({
    field: 'category',
    direction: 'asc',
  })

  // Варіант 9: Автоматична повторна спроба запиту
  useEffect(() => {
    let isActive = true

    async function loadProducts() {
      setIsLoading(true)
      setError(null)

      let success = false
      let lastError = null
      const maxAttempts = 2 // 1 основна + 1 повторна

      for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
          const response = await fetch('/api/products')
          if (!response.ok) {
            throw new Error(`Сервер повернув статус ${response.status}`)
          }
          const data = await response.json()
          
          if (isActive) {
            setProducts(data)
            success = true
          }
          break // Успіх, виходимо з циклу
        } catch (err) {
          lastError = err
          // Якщо це не остання спроба, чекаємо 1 секунду перед повторною
          if (attempt < maxAttempts) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
        }
      }

      if (isActive) {
        if (!success && lastError) {
          setError(lastError.message)
        }
        setIsLoading(false)
      }
    }

    loadProducts()

    return () => {
      isActive = false
    }
  }, [])

  // Debounce для пошуку
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timerId)
  }, [searchQuery])

  const sortedAndFilteredProducts = useMemo(() => {
    const filtered = filterProducts(products, debouncedQuery)

    return [...filtered].sort((a, b) => {
      const catA = a.category
      const catB = b.category

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

  // Стан завантаження
  if (isLoading) {
    return (
      <p className="catalog-page__status-message">
        Завантаження каталогу…
      </p>
    )
  }

  // Варіант 14: Співіснування помилки сервера та заглушки зображення
  if (error) {
    return (
      <div className="catalog-page__error-wrapper">
        <p className="catalog-page__error-message" role="alert">
          Не вдалося завантажити каталог: {error}
        </p>
        <p className="catalog-page__error-info">
          Нижче продемонстровано картку з відсутнім зображенням (заглушка з ЛР2) у стані помилки:
        </p>
        {/* Штучно передаємо товар без зображення, щоб показати заглушку */}
        <ProductList 
          products={[
            { id: 'error-demo', name: 'Товар недоступний', price: 0, category: 'Помилка', inStock: false }
          ]} 
        />
      </div>
    )
  }

  return (
    <div className="catalog-page">
      <div className="catalog-page__controls">
        <SearchPanel 
          value={searchQuery} 
          onChange={setSearchQuery} 
          hint={hintText} 
        />
        <SortControls 
          sortConfig={sortConfig} 
          onSortChange={setSortConfig} 
        />
      </div>
      
      <p className="catalog-page__results-count">
        Знайдено товарів: {sortedAndFilteredProducts.length}
      </p>

      <ProductList products={sortedAndFilteredProducts} />
    </div>
  )
}

export default CatalogPage
