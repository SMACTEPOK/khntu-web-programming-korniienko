import { useState } from 'react'
import { useProducts } from '../hooks/useProducts'
import { useMaterials } from '../hooks/useMaterials'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import SearchPanel from '../components/SearchPanel/SearchPanel'
import SortControls from '../components/SortControls/SortControls'
import ProductList from '../components/ProductList/ProductList'
import ReviewForm from '../components/ReviewForm/ReviewForm'
import { getErrorMessage } from '../utils/getErrorMessage'
import { filterProducts } from '../utils/filterProducts'

export default function CatalogPage() {
  const { status, products, error, retry } = useProducts()
  const { materials, isLoading: matLoading, error: matError, retry: matRetry } = useMaterials()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [sortConfig, setSortConfig] = useState({ field: 'category', direction: 'asc' })

  const sortedAndFiltered = filterProducts(products, searchQuery)
    .sort((a, b) => {
      const valA = a[sortConfig.field] || ''
      const valB = b[sortConfig.field] || ''
      if (typeof valA === 'string') {
        const comp = valA.localeCompare(valB, 'uk')
        return sortConfig.direction === 'asc' ? comp : -comp
      }
      return sortConfig.direction === 'asc' ? valA - valB : valB - valA
    })

  const hintText = products.length > 0 ? products[0].name : ''

  return (
    <div className="w-full">
      <div className="mb-6">
        {matLoading && <p className="text-xs font-mono text-muted animate-pulse">Завантаження матеріалів...</p>}
        {matError && (
          <div className="flex items-center gap-2 text-xs font-mono text-muted">
            <span>Не вдалося завантажити матеріали.</span>
            <button onClick={matRetry} className="text-white underline hover:text-accent uppercase">Спробувати</button>
          </div>
        )}
        {!matLoading && !matError && (
          <div className="flex flex-wrap gap-2">
            {materials.map(m => (
              <span key={m} className="px-2 py-1 bg-surface border-2 border-border text-[10px] font-mono text-muted uppercase">
                {m}
              </span>
            ))}
          </div>
        )}
      </div>

      {status === 'loading' && <Loader label="Завантаження каталогу…" />}
      
      {status === 'error' && (
        <ErrorMessage 
          title="Каталог не завантажено" 
          message={getErrorMessage(error)} 
          onRetry={retry} 
        />
      )}

      {status === 'success' && (
        <>
          <div className="flex flex-col md:flex-row md:items-start gap-6 mb-8 w-full">
            <SearchPanel value={searchQuery} onChange={setSearchQuery} hint={hintText} />
            <SortControls sortConfig={sortConfig} onSortChange={setSortConfig} />
          </div>
          
          <p className="font-mono text-xs text-muted mb-10 tracking-wider uppercase">Знайдено товарів: {sortedAndFiltered.length}</p>
          
          <ProductList products={sortedAndFiltered} searchQuery={searchQuery} />

          <div className="mt-20 border-t-2 border-border pt-10">
            <h2 className="font-mono text-2xl text-[#e0e0e0] uppercase mb-8">Взаємодія з магазином</h2>
            <ReviewForm onReviewSubmit={() => {}} />
          </div>
        </>
      )}
    </div>
  )
}
