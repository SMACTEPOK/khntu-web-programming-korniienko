import PropTypes from 'prop-types'
import { sortConfigShape } from '../../utils/sortConfigShape'
import './SortControls.css'

function SortControls({ sortConfig, onSortChange }) {
  function handleFieldChange(event) {
    onSortChange({ ...sortConfig, field: event.target.value })
  }

  function handleDirectionToggle() {
    const newDirection = sortConfig.direction === 'asc' ? 'desc' : 'asc'
    onSortChange({ ...sortConfig, direction: newDirection })
  }

  return (
    <div className="sort-controls">
      <div className="sort-controls__group">
        <label htmlFor="sort-field" className="sort-controls__label">
          Сортувати за:
        </label>
        <select
          id="sort-field"
          className="sort-controls__select"
          value={sortConfig.field}
          onChange={handleFieldChange}
        >
          <option value="category">Категорією</option>
          <option value="name">Назвою</option>
          <option value="price">Ціною</option>
        </select>
      </div>

      <button
        type="button"
        className="sort-controls__direction"
        onClick={handleDirectionToggle}
      >
        {sortConfig.direction === 'asc' ? 'За зростанням ↑' : 'За спаданням ↓'}
      </button>
    </div>
  )
}

SortControls.propTypes = {
  sortConfig: sortConfigShape.isRequired,
  onSortChange: PropTypes.func.isRequired,
}

export default SortControls
