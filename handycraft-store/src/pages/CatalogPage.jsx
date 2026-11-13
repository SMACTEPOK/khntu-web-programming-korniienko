import { useState, useEffect, useMemo } from 'react'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import SortControls from '../components/SortControls/SortControls'
import ProductList from '../components/ProductList/ProductList'
import ReviewForm from '../components/ReviewForm/ReviewForm'
import { filterProducts } from '../utils/filterProducts'

export default function CatalogPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery)
  const [sortConfig, setSortConfig] = useState({ field: 'category', direction: 'asc' })

  useEffect(() => {
    let isActive = true
    fetch('/api/products')
      .then(res => res.json())
      .then(data => { if (isActive) { setProducts(data); setIsLoading(false) } })
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

  if (isLoading) return <p className="p-10 text-muted text-center uppercase tracking-widest font-mono animate-pulse">Завантаження каталогу…</p>

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8 w-full">
        <SearchPanel value={searchQuery} onChange={setSearchQuery} hint={hintText} />
        <SortControls sortConfig={sortConfig} onSortChange={setSortConfig} />
      </div>
      
      <p className="font-mono text-xs text-muted mb-10 tracking-wider uppercase">Знайдено товарів: {sortedAndFilteredProducts.length}</p>
      
      <ProductList products={sortedAndFilteredProducts} searchQuery={debouncedQuery} />

      <div className="mt-20 border-t-2 border-border pt-10">
        <h2 className="font-mono text-2xl text-[#e0e0e0] uppercase mb-8">Взаємодія з магазином</h2>
        <ReviewForm onReviewSubmit={() => {}} />
      </div>
    </div>
  )
}
