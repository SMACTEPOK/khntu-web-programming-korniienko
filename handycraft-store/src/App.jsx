import { useCartContext } from './context/useCartContext'
import { useDeliveryCityContext } from './context/useDeliveryCityContext'
import CatalogPage from './pages/CatalogPage'
import CartPage from './components/CartPage/CartPage'
import NotificationToast from './components/NotificationToast/NotificationToast'
import BreakpointBadge from './components/dev/BreakpointBadge'

function App() {
  const { totalCount } = useCartContext()
  const { city, setCity, cities } = useDeliveryCityContext()

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <header className="relative border-b-2 border-border bg-[#111] text-white">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 text-left">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4">
            <h1 className="m-0 text-[clamp(36px,7vw,76px)] font-bold leading-[0.95] tracking-[-4px] uppercase">HandyCraft Store</h1>
            <div className="flex items-center gap-4">
              <select 
                className="bg-[#111] text-white border border-border p-2 px-3 font-mono text-xs outline-none cursor-pointer focus:border-accent"
                value={city} 
                onChange={(e) => setCity(e.target.value)}
              >
                {cities.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="font-mono text-sm text-muted bg-[#222] p-2 px-4 border border-border">
                У кошику: {totalCount}
              </div>
            </div>
          </div>
          <p className="mt-4 text-muted font-mono text-xs tracking-wider uppercase">Магазин унікальних товарів ручної роботи</p>
          <div className="hidden sm:block mt-4 text-[#777] font-mono text-[10px] tracking-[3px]">OBJECTS / MATERIALS / HANDMADE</div>
        </div>
      </header>

      <section className="relative bg-[#343434] border-b-2 border-[#111]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="block mb-6 md:mb-8 text-[#a0a0a0] font-mono text-[11px] tracking-wider">01 / INTRODUCTION</div>
          <h2 className="max-w-[850px] m-0 text-[#ededed] text-[clamp(28px,6vw,68px)] font-bold leading-none tracking-[-3px] uppercase">Ласкаво просимо до HandyCraft Store!</h2>
          <p className="max-w-[560px] mt-7 text-muted font-mono text-sm leading-loose">Тут ви знайдете ексклюзивні вироби, створені з любов'ю та увагою до деталей.</p>
        </div>
      </section>

      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10 bg-[#202020] flex-1">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
          <section className="flex-1 w-full min-w-0">
            <h2 className="m-0 pb-5 mb-8 md:mb-14 text-[#e0e0e0] border-b border-border text-[clamp(24px,4vw,42px)] font-bold tracking-[-1px] uppercase">Наш каталог</h2>
            <CatalogPage />
          </section>
          <aside className="relative w-full">
            <CartPage />
          </aside>
        </div>
      </div>

      <footer className="border-t-2 border-border bg-[#111]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-8 text-muted font-mono text-xs tracking-wider uppercase flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="m-0">© 2026 HandyCraft Store. Усі права захищені.</p>
          <nav className="flex gap-6">
            <a href="#" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors">Про нас</a>
            <a href="#" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors">Доставка</a>
            <a href="#" className="hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent transition-colors">Контакти</a>
          </nav>
        </div>
      </footer>

      <NotificationToast />
      {import.meta.env.DEV && <BreakpointBadge />}
    </main>
  )
}

export default App
