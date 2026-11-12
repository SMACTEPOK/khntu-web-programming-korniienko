import PropTypes from 'prop-types'
import { formatPrice } from '../../utils/formatPrice'

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const { id, title, price, image, quantity, stock } = item
  const PLACEHOLDER = '/src/assets/product-placeholder.svg'

  return (
    <li className="grid grid-cols-[48px_1fr_auto] grid-rows-[auto_auto] gap-x-3 gap-y-2 py-4 border-b border-border items-center">
      <img className="row-span-2 w-12 h-12 object-cover grayscale border border-border" src={image || PLACEHOLDER} alt="" />
      <div className="min-w-0">
        <p className="m-0 mb-1 text-white font-mono text-xs uppercase whitespace-nowrap overflow-hidden text-ellipsis">{title}</p>
        <p className="m-0 text-muted text-[11px] font-mono">{formatPrice(price)} × {quantity}</p>
      </div>
      <button type="button" className="justify-self-end bg-transparent border-none text-red-400 hover:text-red-300 hover:underline cursor-pointer font-mono text-[10px] uppercase tracking-wider p-0" onClick={() => onRemove(id)}>Видалити</button>
      <div className="flex items-center gap-1">
        <button type="button" onClick={() => onQuantityChange(id, quantity - 1)} aria-label="Зменшити" className="w-6 h-6 flex items-center justify-center bg-[#111] text-white border border-border cursor-pointer hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed text-sm">−</button>
        <span className="w-6 text-center text-white font-mono text-xs">{quantity}</span>
        <button type="button" onClick={() => onQuantityChange(id, quantity + 1)} disabled={quantity >= stock} aria-label="Збільшити" className="w-6 h-6 flex items-center justify-center bg-[#111] text-white border border-border cursor-pointer hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed text-sm">+</button>
      </div>
      <p className="m-0 text-right text-white font-mono text-sm font-bold">{formatPrice(price * quantity)}</p>
    </li>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
}
