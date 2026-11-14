import { beforeEach, describe, expect, it } from 'vitest'
import { useCartStore } from './cartStore'
import { selectTotalCount, selectTotalPrice } from './cartSelectors'

// Дані мають відповідати реальним полям товарів у проєкті (name, stock, category, image)
const vase = { id: 'p1', name: 'Керамічна ваза', price: 450, stock: 10, category: 'Кераміка', image: '' }
const mug = { id: 'p2', name: 'Кухоль', price: 180, stock: 5, category: 'Кераміка', image: '' }

beforeEach(() => {
  useCartStore.setState({ items: [], promoCode: null })
})

describe('useCartStore', () => {
  it('додає новий товар із кількістю 1', () => {
    useCartStore.getState().addItem(vase)
    const items = useCartStore.getState().items
    
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({
      id: 'p1',
      title: 'Керамічна ваза',
      price: 450,
      quantity: 1,
    })
  })

  it('збільшує кількість при повторному додаванні', () => {
    const { addItem } = useCartStore.getState()
    addItem(vase)
    addItem(vase)
    expect(useCartStore.getState().items[0].quantity).toBe(2)
  })

  it('видаляє позицію, якщо кількість стає нульовою', () => {
    const { addItem, updateQuantity } = useCartStore.getState()
    addItem(vase)
    updateQuantity('p1', 0)
    expect(useCartStore.getState().items).toHaveLength(0)
  })

  it('рахує кількість і суму через селектори', () => {
    const { addItem, updateQuantity } = useCartStore.getState()
    addItem(vase)
    addItem(mug)
    updateQuantity('p2', 3)

    const state = useCartStore.getState()
    expect(selectTotalCount(state)).toBe(4)
    expect(selectTotalPrice(state)).toBe(450 + 180 * 3)
  })
})
