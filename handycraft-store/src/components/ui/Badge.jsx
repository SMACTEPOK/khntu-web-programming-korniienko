import PropTypes from 'prop-types'
import { cx } from './cx'

const TONES = {
  neutral: "bg-surface text-text border-border",
  brand: "bg-[#222] text-white border-accent",
  success: "bg-[#112a11] text-success border-success",
  warning: "bg-[#2a2211] text-yellow-400 border-yellow-400",
  danger: "bg-[#2a1111] text-danger border-danger",
}

export function Badge({ tone = "neutral", className, children }) {
  return (
    <span className={cx("inline-flex items-center px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-wider border shadow-[2px_2px_0_#111]", TONES[tone], className)}>
      {children}
    </span>
  )
}

Badge.propTypes = {
  tone: PropTypes.oneOf(["neutral", "brand", "success", "warning", "danger"]),
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
}
