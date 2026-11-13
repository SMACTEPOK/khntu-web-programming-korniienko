import PropTypes from 'prop-types'

function SearchPanel({ value, onChange, hint }) {
  function handleInputChange(event) {
    onChange(event.target.value)
  }

  return (
    <div className="flex flex-col gap-2 w-full md:max-w-[400px]">
      <label htmlFor="catalog-search" className="font-mono text-xs text-muted tracking-wider uppercase">
        Пошук товару
      </label>
      <input
        id="catalog-search"
        type="text"
        className="px-4 h-11 bg-background text-white border-2 border-border rounded-none font-mono text-sm outline-none transition-colors duration-200 focus:border-accent focus:bg-surface placeholder:text-muted w-full"
        placeholder="Введіть назву товару..."
        value={value}
        onChange={handleInputChange}
      />
      {!value && hint && (
        <button 
          type="button" 
          className="text-left font-mono text-[11px] text-muted tracking-wider mt-1 hover:text-accent hover:underline cursor-pointer bg-transparent border-none p-0"
          onClick={() => onChange(hint)}
        >
          Наприклад: {hint}
        </button>
      )}
    </div>
  )
}

SearchPanel.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  hint: PropTypes.string,
}

export default SearchPanel
