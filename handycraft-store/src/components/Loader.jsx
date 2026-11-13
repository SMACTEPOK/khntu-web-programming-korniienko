import PropTypes from 'prop-types'

export default function Loader({ label = 'Завантаження...' }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-12 text-muted font-mono">
      <span aria-hidden="true" className="w-5 h-5 border-2 border-border border-t-accent animate-spin" />
      <span>{label}</span>
    </div>
  )
}
Loader.propTypes = { label: PropTypes.string }
