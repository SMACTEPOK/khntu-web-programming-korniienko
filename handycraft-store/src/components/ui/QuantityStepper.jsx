import PropTypes from 'prop-types'
import { useCartContext } from '../../context/useCartContext'
import { Button } from './Button'
import { Input } from './Input'

export function QuantityStepper({ item }) {
  const { updateQuantity, removeItem } = useCartContext()
  const { id, quantity, stock } = item

  const handleDecrement = () => {
    if (quantity > 1) updateQuantity(id, quantity - 1)
    else removeItem(id)
  }

  const handleIncrement = () => {
    if (quantity < stock) updateQuantity(id, quantity + 1)
  }

  return (
    <div className="flex items-end gap-2 w-fit">
      <Button variant="secondary" size="sm" onClick={handleDecrement} aria-label="Зменшити кількість">−</Button>
      <div className="w-16">
        <Input 
          label="К-сть" 
          value={quantity} 
          readOnly 
          className="!w-16 text-center" 
          aria-label="Поточна кількість"
        />
      </div>
      <Button variant="secondary" size="sm" onClick={handleIncrement} disabled={quantity >= stock} aria-label="Збільшити кількість">+</Button>
    </div>
  )
}

QuantityStepper.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    stock: PropTypes.number.isRequired,
  }).isRequired,
}
