import { useId } from 'react'
import PropTypes from 'prop-types'
import { cx } from './cx'

export function Input({ label, hint, error, as: Control = "input", id, className, ref, ...rest }) {
  const autoId = useId()
  const controlId = id ?? autoId
  const hintId = hint ? `${controlId}-hint` : undefined
  const errorId = error ? `${controlId}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined

  return (
    <div className={cx("flex flex-col gap-1.5 w-full", className, error && "animate-shake")}>
      <label htmlFor={controlId} className="text-xs font-mono text-muted uppercase tracking-wider">
        {label}
      </label>
      {hint && <p id={hintId} className="text-[11px] font-mono text-muted">{hint}</p>}
      <Control
        id={controlId}
        ref={ref}
        aria-invalid={error ? "true" : undefined}
        aria-describedby={describedBy}
        className={cx(
          "w-full bg-background border-2 px-3 py-2 text-sm font-mono text-white outline-none transition-colors h-11",
          error ? "border-danger focus:border-danger" : "border-border focus:border-accent",
          Control === "textarea" ? "h-auto min-h-[100px] resize-y" : ""
        )}
        {...rest}
      />
      {error && (
        <p id={errorId} role="alert" className="text-[11px] font-mono text-danger mt-1 animate-fade-in">
          {error}
        </p>
      )}
    </div>
  )
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  hint: PropTypes.string,
  error: PropTypes.string,
  as: PropTypes.oneOf(["input", "textarea", "select"]),
  id: PropTypes.string,
  className: PropTypes.string,
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({ current: PropTypes.any })]),
}
