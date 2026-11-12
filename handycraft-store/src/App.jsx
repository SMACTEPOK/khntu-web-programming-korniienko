import { useCart } from './hooks/useCart'
import CatalogPage from './pages/CatalogPage'
import CartPage from './components/CartPage/CartPage'
import './App.css'

function App() {
  const cart = useCart()

  return (
    <main className="store">
      <header className="header">
        <div className="header__top">
          <h1>HandyCraft Store</h1>
          <div className="header__cart-counter">
            У кошику: {cart.totalCount}
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
          <CatalogPage cart={cart} />
        </section>
        <aside className="app-sidebar">
          <CartPage cart={cart} />
        </aside>
      </div>

      <footer className="footer">
        <p>© 2026 HandyCraft Store. Усі права захищені.</p>
      </footer>
    </main>
  )
}

export default App
