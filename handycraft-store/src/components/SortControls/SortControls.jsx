import PropTypes from 'prop-types'
import { sortConfigShape } from '../../utils/sortConfigShape'

function SortControls({ sortConfig, onSortChange }) {
  function handleFieldChange(event) {
    onSortChange({ ...sortConfig, field: event.target.value })
  }

  function handleDirectionToggle() {
    const newDirection = sortConfig.direction === 'asc' ? 'desc' : 'asc'
    onSortChange({ ...sortConfig, direction: newDirection })
  }

  return (
    <div className="flex items-end gap-4 flex-wrap w-full md:w-auto">
      <div className="flex flex-col gap-2 w-full sm:w-auto">
        <label htmlFor="sort-field" className="font-mono text-xs text-muted tracking-wider uppercase">
          Сортувати за:
        </label>
        <select
          id="sort-field"
          className="px-4 h-11 bg-background text-white border-2 border-border rounded-none font-mono text-sm outline-none cursor-pointer focus:border-accent w-full sm:w-[160px] transition-colors"
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
        className="px-4 h-11 bg-surface text-white border-2 border-border rounded-none font-mono text-sm uppercase cursor-pointer hover:bg-[#444] hover:border-accent transition-colors whitespace-nowrap w-full sm:w-auto"
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
