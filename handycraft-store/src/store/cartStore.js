import { create } from 'zustand'

export const useCartStore = create((set) => ({
  items: [],
  promoCode: null,

  addItem: (product) =>
    set((state) => {
      const existing = state.items.find((item) => item.id === product.id)
      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        }
      }
      return {
        items: [
          ...state.items,
          {
            id: product.id,
            title: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            stock: product.stock,
            quantity: 1,
          },
        ],
      }
    }),

  incrementItem: (id) =>
    set((state) => ({
      items: state.items.map((item) =>
        item.id === id && item.quantity < item.stock
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  decrementItem: (id) =>
    set((state) => {
      const item = state.items.find((i) => i.id === id)
      if (!item) return state
      if (item.quantity <= 1) {
        return { items: state.items.filter((i) => i.id !== id) }
      }
      return {
        items: state.items.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity - 1 } : i
        ),
      }
    }),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  clearCart: () => set({ items: [], promoCode: null }),

  applyPromo: (code) =>
    set({ promoCode: code === 'CERAMICS15' ? code : null }),

  // Варіант 14: Завантаження кошика конкретного користувача
  loadCart: (userId) => {
    try {
      const saved = localStorage.getItem(`cart:${userId}`)
      if (saved) {
        set({ items: JSON.parse(saved) })
      } else {
        set({ items: [] })
      }
    } catch {
      set({ items: [] })
    }
  },

  // Варіант 14: Збереження кошика конкретного користувача
  saveCart: (userId) => {
    try {
      const { items } = useCartStore.getState()
      localStorage.setItem(`cart:${userId}`, JSON.stringify(items))
    } catch { /* ignore */ }
  }
}))
