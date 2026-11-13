import { isRouteErrorResponse, Link, useRouteError } from 'react-router'
import { Button } from '../ui/Button'

export default function RouteErrorBoundary() {
  const error = useRouteError()
  
  let title = "Щось пішло не так"
  let details = "Спробуйте оновити сторінку або повернутися до каталогу."

  // Якщо це помилка парсингу HTML (MSW не перехопив запит) - вважаємо це 404
  const isJsonParseError = error instanceof Error && error.message.includes("Unexpected token '<'")

  const is404 = 
    (isRouteErrorResponse(error) && String(error.status) === '404') ||
    (error instanceof Response && error.status === 404) ||
    (error && String(error.status) === '404') ||
    (error && error.response && String(error.response.status) === '404') ||
    isJsonParseError

  if (is404) {
    title = "Товар не знайдено"
    details = "Можливо, його вилучено з вітрини або адресу введено з помилкою."
  } else if (isRouteErrorResponse(error)) {
    title = `Помилка ${error.status}`
    details = error.data || error.statusText || details
  }

  return (
    <section role="alert" className="py-20 text-center flex flex-col items-center">
      <h1 className="text-3xl font-mono text-white uppercase mb-4">{title}</h1>
      <p className="text-muted font-mono mb-8">{details}</p>
      <Link to="/"><Button>До каталогу</Button></Link>
    </section>
  )
}
