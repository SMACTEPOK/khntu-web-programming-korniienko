import { useShallow } from 'zustand/react/shallow'
import { useCartStore } from '../../store/cartStore'

export default function CartItemNamesList() {
  // Без useShallow цей селектор викликав би нескінченний цикл у Zustand 5
  const names = useCartStore(
    useShallow((state) => state.items.map((item) => item.title))
  )

  if (names.length === 0) {
    return <p className="text-[10px] font-mono text-muted uppercase mt-2">Кошик порожній</p>
  }

  return (
    <div className="mt-4 pt-3 border-t border-border/50">
      <p className="text-[10px] font-mono text-muted uppercase mb-1">Товари у кошику:</p>
      <ul className="text-[10px] font-mono text-white uppercase list-disc list-inside">
        {names.map((name, index) => (
          <li key={index} className="truncate">{name}</li>
        ))}
      </ul>
    </div>
  )
}
