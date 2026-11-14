import { Link, useLoaderData } from 'react-router'
import { useReviews } from '../hooks/useReviews'
import { useCartStore } from '../store/cartStore'
import { formatPrice } from '../utils/formatPrice'
import { Button } from '../components/ui/Button'
import Loader from '../components/Loader'

export default function ProductPage() {
  const product = useLoaderData()
  const addItem = useCartStore((s) => s.addItem)
  // Варіант 14: Селектор для кількості конкретного товару
  const inCart = useCartStore((s) => s.items.find(i => i.id === product.id)?.quantity || 0)
  const { reviews, isLoading, error } = useReviews(product.id)

  return (
    <article className="grid gap-8 md:grid-cols-2 bg-surface border-2 border-border p-6 shadow-brutal">
      <nav className="text-sm md:col-span-2 font-mono text-muted uppercase">
        <Link to="/" className="hover:text-accent underline">Каталог</Link>
        {" / "}
        <span className="text-white">{product.name}</span>
      </nav>

      <img src={product.image || '/src/assets/product-placeholder.svg'} alt={product.name} className="aspect-square w-full object-cover border-2 border-border grayscale" />

      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold text-white uppercase">{product.name}</h1>
        <p className="text-2xl font-bold text-accent font-mono">{formatPrice(product.price)}</p>
        <p className="text-muted font-mono text-sm leading-relaxed">{product.category}</p>
        
        {inCart > 0 && (
          <p className="font-mono text-sm text-white uppercase bg-[#333] px-3 py-2 border border-border inline-block w-fit">
            У кошику: <span className="text-accent font-bold">{inCart}</span> шт.
          </p>
        )}

        <div className="mt-auto pt-6">
          <Button onClick={() => addItem(product)} disabled={product.stock <= 0 || inCart >= product.stock} className="w-full">
            {product.stock <= 0 ? "Немає в наявності" : (inCart >= product.stock ? "Максимум" : "Додати в кошик")}
          </Button>
        </div>
      </div>

      <div className="md:col-span-2 mt-8 border-t-2 border-border pt-6">
        <h3 className="text-lg font-mono text-white uppercase mb-4">Відгуки покупців</h3>
        {isLoading && <Loader label="Завантаження відгуків..." />}
        {error && <p className="text-danger font-mono text-sm">Не вдалося завантажити відгуки.</p>}
        {!isLoading && !error && reviews.length === 0 && <p className="text-muted font-mono text-sm">Ще немає відгуків.</p>}
        {!isLoading && !error && reviews.length > 0 && (
          <ul className="flex flex-col gap-4">
            {reviews.map(r => (
              <li key={r.id} className="bg-background border border-border p-4">
                <div className="flex justify-between mb-2">
                  <span className="font-bold text-white font-mono text-sm uppercase">{r.author}</span>
                  <span className="text-accent font-mono text-xs">{'★'.repeat(r.rating)}</span>
                </div>
                <p className="text-muted font-mono text-sm">{r.text}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  )
}
