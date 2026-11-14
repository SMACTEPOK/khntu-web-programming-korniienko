export const selectItems = (state) => state.items

export const selectTotalCount = (state) =>
  state.items.reduce((sum, item) => sum + item.quantity, 0)

export const selectTotalPrice = (state) =>
  state.items.reduce((sum, item) => {
    const price =
      state.promoCode === 'CERAMICS15' && item.category === 'Кераміка'
        ? item.price * 0.85
        : item.price
    return sum + price * item.quantity
  }, 0)

export const selectIsEmpty = (state) => state.items.length === 0
export const selectPromoCode = (state) => state.promoCode
