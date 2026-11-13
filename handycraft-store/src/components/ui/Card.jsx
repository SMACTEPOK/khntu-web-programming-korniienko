import PropTypes from 'prop-types'
import { cx } from './cx'

export function Card({ href, className, children, ...rest }) {
  const baseClasses = "flex flex-col bg-surface border-2 border-border shadow-brutal transition-all"
  const interactiveClasses = href ? "group hover:-translate-y-1 hover:shadow-brutal-hover hover:border-accent focus-visible:outline-2 focus-visible:outline-accent focus-visible:outline-offset-2 cursor-pointer" : ""
  const combinedClasses = cx(baseClasses, interactiveClasses, className)

  // Варіант 9: Якщо передано href, картка стає єдиним клікабельним посиланням
  if (href) {
    return (
      <a href={href} className={combinedClasses} {...rest}>
        {children}
      </a>
    )
  }

  return <div className={combinedClasses} {...rest}>{children}</div>
}

Card.propTypes = {
  href: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}

export function CardTitle({ className, children }) {
  return (
    <h3 className={cx("m-0 text-white font-bold text-lg leading-tight uppercase p-4 border-b border-border", className)}>
      {children}
    </h3>
  )
}
CardTitle.propTypes = { className: PropTypes.string, children: PropTypes.node.isRequired }
