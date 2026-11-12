import { useCartContext } from './context/useCartContext'
import { useDeliveryCityContext } from './context/useDeliveryCityContext'
import CatalogPage from './pages/CatalogPage'
import CartPage from './components/CartPage/CartPage'
import NotificationToast from './components/NotificationToast/NotificationToast'
import './App.css'

function App() {
  const { totalCount } = useCartContext()
  const { city, setCity, cities } = useDeliveryCityContext()

  return (
    <main className="store">
      <header className="header">
        <div className="header__top">
          <h1>HandyCraft Store</h1>
          <div className="header__controls">
            <select 
              className="header__city-select" 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
            >
              {cities.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            <div className="header__cart-counter">
              У кошику: {totalCount}
            </div>
          </div>
        </div>
        <p>Магазин унікальних товарів ручної роботи</p>
      </header>

      <section className="welcome">
        <h2>Ласкаво просимо до HandyCraft Store!</h2>
        <p>Тут ви знайдете ексклюзивні вироби, створені з любов'ю та увагою до деталей.</p>
      </section>

      <div className="app-layout">
        <section className="catalog">
          <h2>Наш каталог</h2>
          <CatalogPage />
        </section>
        <aside className="app-sidebar">
          <CartPage />
        </aside>
      </div>

      <footer className="footer">
        <p>© 2026 HandyCraft Store. Усі права захищені.</p>
      </footer>

      <NotificationToast />
    </main>
  )
}

export default App
