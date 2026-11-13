import { NavLink, Outlet, useNavigation } from 'react-router'
import { useCartContext } from '../context/useCartContext'
import { useDeliveryCityContext } from '../context/useDeliveryCityContext'
import NotificationToast from '../components/NotificationToast/NotificationToast'

const navLinkClass = ({ isActive }) => {
  const base = "font-mono text-xs uppercase tracking-wider px-3 py-2 border-2 transition-colors"
  return isActive 
    ? `${base} bg-accent text-background border-accent font-bold` 
    : `${base} text-muted border-transparent hover:text-white hover:border-border`
}

export default function RootLayout() {
  const { totalCount } = useCartContext()
  const { city, setCity, cities } = useDeliveryCityContext()
  const navigation = useNavigation()
  const isLoading = navigation.state === 'loading'

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b-2 border-border bg-[#111] text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <h1 className="m-0 text-[clamp(36px,7vw,76px)] font-bold leading-[0.95] tracking-[-4px] uppercase">
              <NavLink to="/" end className="hover:text-accent transition-colors">HandyCraft Store</NavLink>
            </h1>
            <div className="flex items-center gap-4">
              <select 
                className="bg-[#111] text-white border border-border p-2 px-3 font-mono text-xs outline-none cursor-pointer focus:border-accent"
                value={city} onChange={(e) => setCity(e.target.value)}
              >
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <NavLink to="/cart" className={navLinkClass}>
                Кошик: <span key={totalCount} className="inline-block animate-badge-pop font-bold text-white">{totalCount}</span>
              </NavLink>
            </div>
          </div>
          <nav className="flex flex-wrap gap-2 mt-6 border-t border-border/50 pt-4">
            <NavLink to="/" end className={navLinkClass}>Каталог</NavLink>
            <NavLink to="/category/ceramics" className={navLinkClass}>Кераміка</NavLink>
            <NavLink to="/category/textile" className={navLinkClass}>Текстиль</NavLink>
            <NavLink to="/category/wood" className={navLinkClass}>Дерево</NavLink>
          </nav>
        </div>
      </header>

      {/* Варіант 14: Плавне згасання Outlet */}
      <main 
        className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10 flex-1 transition-opacity duration-300 motion-reduce:transition-none ${
          isLoading ? 'opacity-50' : 'opacity-100'
        }`}
      >
        <Outlet />
      </main>

      <footer className="border-t-2 border-border bg-[#111]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-muted font-mono text-xs tracking-wider uppercase flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="m-0">© 2026 HandyCraft Store. Усі права захищені.</p>
          <div className="flex gap-6">
            <NavLink to="/order/101" className="hover:text-white underline">Перевірити замовлення (Тест)</NavLink>
          </div>
        </div>
      </footer>
      <NotificationToast />
    </div>
  )
}
