import { Link } from 'react-router'
import { Button } from '../components/ui/Button'

export default function NotFoundPage() {
  return (
    <section className="py-20 text-center flex flex-col items-center">
      <h1 className="text-5xl font-mono text-white uppercase mb-4 tracking-widest">404</h1>
      <p className="text-muted font-mono mb-8">Сторінку не знайдено. Перевірте адресу.</p>
      <Link to="/"><Button>Повернутися до каталогу</Button></Link>
    </section>
  )
}
