import { useAuth } from '../context/AuthContext'

const ORDERS = [
  { id: 'A-1042', date: '2026-09-28', total: 1240, status: 'Доставлено' },
  { id: 'A-1057', date: '2026-10-05', total: 680, status: 'У дорозі' },
]

export default function OrdersPage() {
  const { user } = useAuth()

  return (
    <section className="mx-auto max-w-3xl w-full px-4 py-10">
      <h1 className="mb-2 text-3xl font-bold text-white uppercase">Мої замовлення</h1>
      {/* Варіант 4: Виводимо displayName */}
      <p className="mb-8 font-mono text-sm text-accent uppercase tracking-wider">
        Користувач: {user.displayName || user.email}
      </p>
      
      <ul className="space-y-4">
        {ORDERS.map((order) => (
          <li key={order.id} className="bg-surface border-2 border-border p-5 shadow-brutal flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <p className="font-bold text-white font-mono text-lg m-0">№{order.id}</p>
              <p className="text-muted font-mono text-xs mt-1">від {order.date}</p>
            </div>
            <div className="text-right">
              <p className="text-accent font-mono text-lg font-bold m-0">{order.total.toLocaleString('uk-UA')} ₴</p>
              <p className="text-muted font-mono text-xs mt-1 uppercase">{order.status}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
