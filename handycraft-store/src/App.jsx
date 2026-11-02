import './App.css'

function App() {
  return (
    <main className="store">
      <header className="header">
        <h1>HandyCraft Store</h1>
        <p>Магазин унікальних товарів ручної роботи</p>
      </header>

      <section className="welcome">
        <h2>Ласкаво просимо до HandyCraft Store!</h2>
        <p>
          Тут ви знайдете ексклюзивні вироби, створені з любов'ю та увагою
          до деталей.
        </p>
      </section>

      <section className="catalog">
        <h2>Наш каталог</h2>
        <p>Незабаром тут з'являться наші найкращі товари ручної роботи.</p>
      </section>

      <footer className="footer">
        <p>© 2026 HandyCraft Store. Усі права захищені.</p>
      </footer>
    </main>
  )
}

export default App