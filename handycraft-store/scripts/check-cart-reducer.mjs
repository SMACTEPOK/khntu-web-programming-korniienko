import assert from 'node:assert/strict';
import { CART_ACTIONS, cartReducer, initialCartState } from '../src/hooks/cartReducer.js';

const vase = { id: 'p-1', name: 'Ваза', price: 1000, category: 'Кераміка', stock: 3 };
const add = (state, product, quantity) =>
  cartReducer(state, { type: CART_ACTIONS.ADD_ITEM, payload: { product, quantity } });

// 1. Тест на обмеження залишку (Варіант 9)
let state = add(initialCartState, vase, 2);
assert.equal(state.items[0].quantity, 2);
state = add(state, vase, 5); // Намагаємось додати 5, але залишок 3
assert.equal(state.items[0].quantity, 3, 'Має обмежитись залишком');

// 2. Тест на промокод (Варіант 4)
const withPromo = cartReducer(state, { type: CART_ACTIONS.APPLY_PROMO, payload: { code: 'CERAMICS15' } });
assert.equal(withPromo.promoCode, 'CERAMICS15');

console.log('cartReducer: усі перевірки пройдено');
