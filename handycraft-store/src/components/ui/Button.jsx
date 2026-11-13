import PropTypes from 'prop-types'
import { cx } from './cx'

const BASE = "inline-flex items-center justify-center gap-2 rounded-control font-mono font-bold uppercase transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50"

const VARIANTS = {
  primary: "bg-[#111] text-white border-2 border-accent hover:bg-surface hover:shadow-brutal active:translate-y-0.5",
  secondary: "bg-surface text-text border-2 border-border hover:border-accent hover:text-white",
  danger: "bg-[#2a1111] text-danger border-2 border-danger hover:bg-danger hover:text-background",
}

const SIZES = {
  sm: "h-9 px-3 text-xs",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
}

export function Button({ variant = "primary", size = "md", type = "button", className, children, ref, ...rest }) {
  return (
    <button
      ref={ref}
      type={type}
      className={cx(BASE, VARIANTS[variant], SIZES[size], className)}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  variant: PropTypes.oneOf(["primary", "secondary", "danger"]),
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  type: PropTypes.oneOf(["button", "submit", "reset"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
}
