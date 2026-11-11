import './App.css'
import ProductCard from './components/ProductCard/ProductCard'

function App() {
  const products = [
    {
      id: 1,
      name: 'Керамічна ваза',
      price: 450,
      category: 'Кераміка',
      image: '/src/assets/product-placeholder.svg',
    },
    {
      id: 2,
      name: 'Дерев’яна миска',
      price: 320,
      category: 'Дерев’яні вироби',
      // Бейдж Хендмейд з'явиться автоматично завдяки конфігу
    },
    {
      id: 3,
      name: 'Авторський кулон',
      price: 780,
      category: 'Прикраси',
      image: '/src/assets/product-placeholder.svg',
      inStock: false,
    },
    {
      id: 4,
      name: 'Таємничий артефакт',
      price: 100,
      // Немає ні картинки, ні категорії (тест Варіанту 9)
    },
  ]

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

        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>

      <footer className="footer">
        <p>© 2026 HandyCraft Store. Усі права захищені.</p>
      </footer>
    </main>
  )
}

export default App