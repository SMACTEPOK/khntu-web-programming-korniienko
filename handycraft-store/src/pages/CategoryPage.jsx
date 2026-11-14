import { Link, useParams } from 'react-router'
import ProductList from '../components/ProductList/ProductList'
import Loader from '../components/Loader'
import ErrorMessage from '../components/ErrorMessage'
import { getErrorMessage } from '../utils/getErrorMessage'
import { useProducts } from '../hooks/useProducts'

const CATEGORY_MAP = {
  'ceramics': 'Кераміка',
  'textile': 'Текстиль',
  'wood': 'Дерев’яні вироби'
}

export default function CategoryPage() {
  const { categorySlug } = useParams()
  const { status, products, error, retry } = useProducts()
  const categoryName = CATEGORY_MAP[categorySlug] || categorySlug

  let content

  if (status === 'loading') {
    content = <Loader label="Завантаження категорії…" />
  } else if (status === 'error') {
    content = (
      <ErrorMessage
        title="Не вдалося завантажити категорію"
        message={getErrorMessage(error)}
        onRetry={retry}
      />
    )
  } else {
    const filtered = products.filter(p => p.category === categoryName)
    content = <ProductList products={filtered} />
  }

  return (
    <section>
      <nav className="mb-6 text-sm font-mono text-muted uppercase">
        <Link to="/" className="hover:text-accent underline">Каталог</Link> / <span className="text-white">{categoryName}</span>
      </nav>
      <h1 className="mb-8 text-3xl font-bold text-white uppercase border-b-2 border-border pb-4">Категорія: {categoryName}</h1>
      {content}
    </section>
  )
}
