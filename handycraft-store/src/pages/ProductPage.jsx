import { Link, useLoaderData } from 'react-router'
import { useCartContext } from '../context/useCartContext'
import { formatPrice } from '../utils/formatPrice'
import { Button } from '../components/ui/Button'

export default function ProductPage() {
  const product = useLoaderData()
  const { addItem } = useCartContext()

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
        
        <div className="mt-auto pt-6">
          <Button 
            onClick={() => addItem(product)} 
            disabled={product.stock <= 0}
            className="w-full"
          >
            {product.stock > 0 ? "Додати в кошик" : "Немає в наявності"}
          </Button>
        </div>
      </div>
    </article>
  )
}
