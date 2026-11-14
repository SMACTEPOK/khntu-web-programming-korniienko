import { useState, useMemo } from 'react'
import { useCart } from '../../hooks/useCart'
import { useDeliveryCityContext } from '../../context/useDeliveryCityContext'
import CartItem from '../CartItem/CartItem'
import CartItemNamesList from '../CartItemNamesList/CartItemNamesList'
import { formatPrice } from '../../utils/formatPrice'

export default function CartPage() {
  const { items, totalCount, totalPrice, isEmpty, incrementItem, decrementItem, removeItem, clearCart, applyPromo, promoCode } = useCart()
  const { city } = useDeliveryCityContext()
  const [inputCode, setInputCode] = useState('')

  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      const cat = item.category || 'Без категорії'
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(item)
      return acc
    }, {})
  }, [items])

  const handleApplyPromo = (e) => {
    e.preventDefault()
    applyPromo(inputCode.trim().toUpperCase())
    setInputCode('')
  }

  if (isEmpty) {
    return (
      <section className="bg-surface border-2 border-border p-5 sticky top-5">
        <h2 className="m-0 mb-4 text-white font-mono text-lg border-b-2 border-border pb-2 uppercase">Кошик</h2>
        <p className="text-muted text-sm">У кошику поки немає товарів.</p>
      </section>
    )
  }

  return (
    <section className="bg-surface border-2 border-border p-5 sticky top-5">
      <h2 className="m-0 mb-4 text-white font-mono text-lg border-b-2 border-border pb-2 uppercase">Кошик ({totalCount})</h2>
      
      <div className="flex flex-col gap-5">
        {Object.entries(groupedItems).map(([category, catItems]) => {
          const categorySubtotal = catItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
          return (
            <div key={category} className="bg-[#2a2a2a] border border-[#444]">
              <div className="flex justify-between p-2 px-3 bg-[#333] text-muted font-mono text-[11px] uppercase border-b border-[#444]">
                <span>{category}</span>
                <span>{formatPrice(categorySubtotal)}</span>
              </div>
              <ul className="list-none p-0 m-0">
                {catItems.map((item) => (
                  <CartItem key={item.id} item={item} onIncrement={incrementItem} onDecrement={decrementItem} onRemove={removeItem} />
                ))}
              </ul>
            </div>
          )
        })}
      </div>

      <form className="flex gap-2 mt-4 mb-4" onSubmit={handleApplyPromo}>
        <input type="text" placeholder="Промокод (CERAMICS15)" value={inputCode} onChange={e => setInputCode(e.target.value)} className="flex-1 bg-background border-2 border-border text-white p-2 font-mono text-xs outline-none focus:border-accent" />
        <button type="submit" className="bg-[#111] border-2 border-border text-white p-2 px-3 cursor-pointer font-mono hover:border-accent">ОК</button>
      </form>
      {promoCode && <p className="text-green-500 text-[11px] mb-3 font-mono">Застосовано: {promoCode}</p>}

      <CartItemNamesList />

      <div className="flex flex-col gap-3 border-t-2 border-border pt-4 mt-4">
        <div className="flex justify-between text-muted font-mono text-xs pb-3 border-b border-dashed border-border">
          <span>Доставка до:</span> <strong className="text-white">{city}</strong>
        </div>
        <div className="flex justify-between items-center">
          <p className="m-0 text-white font-mono text-base">Разом: <strong>{formatPrice(totalPrice)}</strong></p>
          <button type="button" className="bg-transparent border-none text-muted hover:text-red-400 hover:underline cursor-pointer text-xs font-mono" onClick={clearCart}>Очистити кошик</button>
        </div>
      </div>
    </section>
  )
}
