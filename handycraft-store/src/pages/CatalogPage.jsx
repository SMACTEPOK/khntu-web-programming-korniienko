import { useState, useEffect } from 'react'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import SortControls from '../components/SortControls/SortControls'
import ProductList from '../components/ProductList/ProductList'
import { mockProducts } from '../data/mockProducts'
import { filterProducts } from '../utils/filterProducts'
import './CatalogPage.css'

function CatalogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)
  
  // Стан конфігурації сортування (Варіант 14)
  const [sortConfig, setSortConfig] = useState({
    field: 'category', // За замовчуванням сортуємо за категорією (Варіант 4)
    direction: 'asc',
  })

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timerId)
  }, [searchQuery])

  // 1. Спочатку фільтруємо
  const filteredProducts = filterProducts(mockProducts, debouncedQuery)

  // 2. Потім сортуємо (Варіант 4 + Варіант 9)
  const sortedAndFilteredProducts = [...filteredProducts].sort((a, b) => {
    // Витягуємо значення поля для порівняння. Якщо undefined - ставимо порожній рядок.
    const valueA = a[sortConfig.field] || ''
    const valueB = b[sortConfig.field] || ''

    // СПЕЦІАЛЬНА ЛОГІКА ДЛЯ КАТЕГОРІЙ (Варіант 9: undefined в кінець)
    if (sortConfig.field === 'category') {
      const catA = a.category
      const catB = b.category

      if (!catA && !catB) return 0 // Обидва без категорії - байдуже
      if (!catA) return 1 // "a" без категорії -> відправляємо в кінець
      if (!catB) return -1 // "b" без категорії -> відправляємо в кінець

      // Використовуємо localeCompare для правильного українського алфавіту
      const comparison = catA.localeCompare(catB, 'uk')
      return sortConfig.direction === 'asc' ? comparison : -comparison
    }

    // Звичайне сортування для інших полів (назва, ціна)
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      const comparison = valueA.localeCompare(valueB, 'uk')
      return sortConfig.direction === 'asc' ? comparison : -comparison
    }

    // Для чисел (ціни)
    if (valueA < valueB) return sortConfig.direction === 'asc' ? -1 : 1
    if (valueA > valueB) return sortConfig.direction === 'asc' ? 1 : -1
    return 0
  })

  const hintText = mockProducts[0].name

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
