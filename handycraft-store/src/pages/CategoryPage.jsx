import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import ProductList from '../components/ProductList/ProductList'

const CATEGORY_MAP = {
  'ceramics': 'Кераміка',
  'textile': 'Текстиль',
  'wood': 'Дерев’яні вироби'
}

export default function CategoryPage() {
  const { categorySlug } = useParams()
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Отримуємо правильну назву категорії для фільтрації
  const categoryName = CATEGORY_MAP[categorySlug] || categorySlug

  useEffect(() => {
    let isActive = true
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (isActive) {
          setProducts(data.filter(p => p.category === categoryName))
          setIsLoading(false)
        }
      })
    return () => { isActive = false }
  }, [categoryName])

  return (
    <section>
      <nav className="mb-6 text-sm font-mono text-muted uppercase">
        <Link to="/" className="hover:text-accent underline">Каталог</Link> / <span className="text-white">{categoryName}</span>
      </nav>
      <h1 className="mb-8 text-3xl font-bold text-white uppercase border-b-2 border-border pb-4">Категорія: {categoryName}</h1>
      {isLoading ? <p className="text-muted font-mono">Завантаження...</p> : <ProductList products={products} />}
    </section>
  )
}
