import PropTypes from 'prop-types'
import { formatPrice } from '../../utils/formatPrice'

export default function CartItem({ item, onQuantityChange, onRemove }) {
  const { id, title, price, image, quantity, stock } = item
  const PLACEHOLDER = '/src/assets/product-placeholder.svg'

  return (
    // Додано px-4 для відступу з боків та last:border-b-0 (прибирає нижню межу в останнього елемента)
    <li className="flex items-start gap-3 py-4 px-4 border-b border-border last:border-b-0">
      {/* Зображення */}
      <img className="w-12 h-12 object-cover grayscale border border-border shrink-0" src={image || PLACEHOLDER} alt="" />
      
      {/* Основна інформація */}
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <p className="m-0 text-white font-mono text-[11px] uppercase leading-tight break-words">{title}</p>
          <button 
            type="button" 
            className="bg-transparent border-none text-danger hover:text-white hover:underline cursor-pointer font-mono text-[9px] uppercase tracking-wider p-0 shrink-0" 
            onClick={() => onRemove(id)}
          >
            Видалити
          </button>
        </div>
        
        <p className="m-0 text-muted text-[10px] font-mono mt-1">{formatPrice(price)} × {quantity}</p>
        
        <div className="flex justify-between items-center mt-3">
          {/* Кнопки кількості */}
          <div className="flex items-center gap-1">
            <button type="button" onClick={() => onQuantityChange(id, quantity - 1)} aria-label="Зменшити" className="w-6 h-6 flex items-center justify-center bg-[#111] text-white border border-border cursor-pointer hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed text-sm transition-colors">−</button>
            <span className="w-6 text-center text-white font-mono text-xs">{quantity}</span>
            <button type="button" onClick={() => onQuantityChange(id, quantity + 1)} disabled={quantity >= stock} aria-label="Збільшити" className="w-6 h-6 flex items-center justify-center bg-[#111] text-white border border-border cursor-pointer hover:border-accent disabled:opacity-30 disabled:cursor-not-allowed text-sm transition-colors">+</button>
          </div>
          {/* Загальна ціна */}
          <p className="m-0 text-white font-mono text-sm font-bold">{formatPrice(price * quantity)}</p>
        </div>
      </div>
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
