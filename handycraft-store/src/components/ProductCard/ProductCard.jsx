import PropTypes from 'prop-types'
import { CATEGORIES } from '@config/categories'
import { calculateDiscountedPrice } from '../../utils/calculateDiscountedPrice'
import { formatPrice } from '../../utils/formatPrice'
import { useCartContext } from '../../context/useCartContext'
import { useNotificationContext } from '../../context/useNotificationContext'
import { highlightMatch } from '../../utils/highlightMatch'
import { Button } from '../ui/Button'

const PLACEHOLDER_IMAGE = '/src/assets/product-placeholder.svg'

function ProductCard({ product, searchQuery, onOpenDetails }) {
  const { items, addItem, promoCode } = useCartContext()
  const { addNotification } = useNotificationContext()

  const { name, price, image, category, stock = 0 } = product
  const imageSrc = image || PLACEHOLDER_IMAGE
  const isHandmade = category === CATEGORIES.WOOD
  const isAvailable = stock > 0

  const cartItem = items.find((i) => i.id === product.id)
  const cartQuantity = cartItem ? cartItem.quantity : 0
  const isMaxInCart = cartQuantity >= stock

  const finalPrice = calculateDiscountedPrice(price, category, promoCode)
  const hasDiscount = finalPrice < price

  const handleAdd = () => {
    addItem(product)
    addNotification(`Товар "${name}" додано в кошик!`, 'success')
  }

  return (
    <article className="flex flex-col w-full min-w-0 overflow-hidden bg-surface border-2 border-border rounded-none shadow-brutal transition-all duration-200 ease-linear hover:-translate-x-1 hover:-translate-y-1 hover:shadow-brutal-hover hover:border-accent">
      <img className="block w-full h-[190px] object-cover grayscale contrast-125 border-b-2 border-border" src={imageSrc} alt={name} />
      <div className="flex flex-col items-start gap-2.5 p-4 w-full flex-1 min-w-0">
        <h3 className="m-0 text-white text-lg font-bold leading-tight uppercase min-h-[2.4em] break-words">
          {highlightMatch(name, searchQuery)}
        </h3>
        
        <div className="flex items-center gap-2 flex-wrap">
          {hasDiscount ? (
            <>
              <p className="m-0 text-muted font-mono text-sm line-through">{formatPrice(price)}</p>
              <p className="m-0 text-text font-mono text-lg font-bold">{formatPrice(finalPrice)}</p>
            </>
          ) : (
            <p className="m-0 text-text font-mono text-lg font-bold">{formatPrice(price)}</p>
          )}
        </div>

        <p className="m-0 text-muted font-mono text-[10px] tracking-wider uppercase">{category || 'Без категорії'}</p>
        
        <div className="flex flex-col items-start gap-2 mt-auto mb-2 w-full">
          <span className={`px-2 py-1 bg-[#111] border text-[9px] font-bold tracking-wider uppercase font-mono ${isAvailable ? 'border-accent text-accent' : 'border-border text-muted'}`}>
            {isAvailable ? `В наявності: ${stock} шт.` : 'Немає в наявності'}
          </span>
          {isHandmade && <span className="px-2 py-1 bg-[#222] text-white border border-accent text-[9px] font-bold tracking-wider uppercase font-mono shadow-[2px_2px_0_#111]">Хендмейд</span>}
          {cartQuantity > 0 && <span className="px-2 py-1 bg-[#444] text-white border border-white text-[9px] font-bold tracking-wider uppercase font-mono">У кошику: {cartQuantity}</span>}
        </div>

        <div className="flex w-full gap-2 mt-auto">
          <Button variant="secondary" size="sm" onClick={onOpenDetails} className="flex-1">Деталі</Button>
          <Button 
            size="sm"
            onClick={handleAdd} 
            disabled={!isAvailable || isMaxInCart}
            className="flex-1"
          >
            {!isAvailable ? 'Немає' : (isMaxInCart ? 'Максимум' : 'Купити')}
          </Button>
        </div>
      </div>
    </article>
  )
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  searchQuery: PropTypes.string,
  onOpenDetails: PropTypes.func.isRequired,
}

export default ProductCard
