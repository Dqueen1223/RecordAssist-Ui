import { cleanup } from '@testing-library/react';
import getQtyInCart, { inventoryAvailable } from './ProductCardService';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);

describe('getQuantityInCart', () => {
  test('product already in cart returns its quantity', () => {
    expect(getQtyInCart([{ id: 3, quantity: 4 }], { id: 3 })).toBe(4);
  });

  test('empty cart returns zero', () => {
    expect(getQtyInCart([], { id: 3 })).toBe(0);
  });

  test('cart with other products in it still returns zero if no match', () => {
    expect(getQtyInCart([{ id: 30, quantity: 11 }], { id: 3 })).toBe(0);
  });
});

describe('inventoryAvailable', () => {
  test('if adding one item to cart quantity is greater than available inventory', () => {
    expect(inventoryAvailable(5, { quantity: 4 })).toBe(false);
  });

  test('if adding one item to cart quantity is less than available inventory', () => {
    expect(inventoryAvailable(5, { quantity: 6 })).toBe(true);
  });

  test('if adding one item to cart quantity is equal to available inventory', () => {
    expect(inventoryAvailable(9, { quantity: 10 })).toBe(true);
  });
});
