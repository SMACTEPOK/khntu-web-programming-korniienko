import PropTypes from 'prop-types'
import { Button } from './ui/Button'

export default function ErrorMessage({ title, message, onRetry }) {
  return (
    <div role="alert" className="mx-auto max-w-md bg-[#151515] border-2 border-border p-6 text-center shadow-[6px_6px_0_#000]">
      <h2 className="text-lg font-bold font-mono text-white uppercase tracking-wider">{title}</h2>
      <p className="mt-4 text-sm font-mono text-muted leading-relaxed">{message}</p>
      {onRetry && (
        <Button variant="secondary" onClick={onRetry} className="mt-6 w-full">
          Спробувати ще раз
        </Button>
      )}
    </div>
  )
}
ErrorMessage.propTypes = {
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  onRetry: PropTypes.func,
}
