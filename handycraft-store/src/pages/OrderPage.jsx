import { Link, useLoaderData } from 'react-router'
import { formatPrice } from '../utils/formatPrice'

export default function OrderPage() {
  const order = useLoaderData()

  return (
    <section className="bg-surface border-2 border-border p-8 max-w-2xl mx-auto shadow-brutal">
      <nav className="mb-6 text-sm font-mono text-muted uppercase">
        <Link to="/" className="hover:text-accent underline">Каталог</Link> / Замовлення
      </nav>
      <h1 className="text-2xl font-bold text-white uppercase mb-6 border-b border-border pb-4">Замовлення #{order.id}</h1>
      
      <div className="flex flex-col gap-4 font-mono text-sm">
        <p className="flex justify-between border-b border-border/50 pb-2">
          <span className="text-muted">Дата оформлення:</span> 
          <span className="text-white">{order.date}</span>
        </p>
        <p className="flex justify-between border-b border-border/50 pb-2">
          <span className="text-muted">Статус:</span> 
          <span className="text-accent font-bold uppercase">{order.status}</span>
        </p>
        <p className="flex justify-between border-b border-border/50 pb-2">
          <span className="text-muted">Сума:</span> 
          <span className="text-white font-bold">{formatPrice(order.total)}</span>
        </p>
      </div>
      
      {/* Посилання для тестування скасування запиту (Варіант 9) */}
      <div className="mt-8 pt-6 border-t border-border flex gap-4">
        <span className="text-muted text-xs uppercase self-center">Тест cancellation:</span>
        <Link to="/order/101" className="text-xs text-accent underline">Замовлення 101</Link>
        <Link to="/order/102" className="text-xs text-accent underline">Замовлення 102</Link>
      </div>
    </section>
  )
}
