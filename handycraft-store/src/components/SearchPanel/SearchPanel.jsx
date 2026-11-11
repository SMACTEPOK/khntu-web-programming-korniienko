import PropTypes from 'prop-types'
import './SearchPanel.css'

function SearchPanel({ value, onChange, hint }) {
  function handleInputChange(event) {
    onChange(event.target.value)
  }

  return (
    <div className="search-panel">
      <label htmlFor="catalog-search" className="search-panel__label">
        Пошук товару
      </label>
      <input
        id="catalog-search"
        type="text"
        className="search-panel__input"
        placeholder="Введіть назву товару..."
        value={value}
        onChange={handleInputChange}
      />
      {!value && hint && (
        <button 
          type="button" 
          className="search-panel__hint" 
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
