import { cleanup } from '@testing-library/react';
import validateCreateProductForm from './FormValidation';

afterEach(cleanup);

describe('Validatefrom', () => {
  test('valid quantity returns true', () => {
    expect(validateCreateProductForm([{ id: 'quantity', value: 4 }], 1)).toBeTruthy();
  });
  test('Decimal Returns error message', () => {
    expect(validateCreateProductForm({ quantity: 4.3 }, ['quantity'])).toStrictEqual({
      quantity: 'No decimals allowed'
    });
  });
  test('Valid Quantity returns empty array', () => {
    expect(
      validateCreateProductForm({ quantity: 40 }, ['quantity'])
    ).toStrictEqual({
    });
  });
  test('Negative Quantity returns error', () => {
    expect(
      validateCreateProductForm({ quantity: -40 }, ['quantity'])
    ).toStrictEqual({
      quantity: 'No Negative Quantity'
    });
  });
  test('Input letters in price returns message', () => {
    expect(
      validateCreateProductForm({ price: 'hello' }, ['price'])
    ).toStrictEqual({
      price: 'Requires two decimals'
    });
  });
  test('letters return nonNumeric', () => {
    expect(
      validateCreateProductForm({ price: 2.0 }, ['price'])
    ).toStrictEqual({
      price: 'Requires two decimals'
    });
  });
  test('nonDecimalPrice returns right error message', () => {
    expect(validateCreateProductForm({ price: 20 }, ['price'])).toStrictEqual({
      price: 'Requires two decimals'
    });
  });
  test('null price value returns required', () => {
    expect(
      validateCreateProductForm({ price: null }, ['price'])
    ).toStrictEqual({
      price: 'Required'
    });
  });
  test('null category value returns required', () => {
    expect(
      validateCreateProductForm({ price: null }, ['price'])
    ).toStrictEqual({
      price: 'Required'
    });
  });
  test('multiple fields return correct error', () => {
    expect(
      validateCreateProductForm({
        price: null, quantity: -40, type: 'blue', name: null
      }, [
        'price',
        'quantity',
        'type',
        'name'
      ])
    ).toStrictEqual({
      price: 'Required',
      quantity: 'No Negative Quantity',
      name: 'Required'
    });
  });
  test('demographic null value returns error message', () => {
    expect(validateCreateProductForm({ demographic: '' }, [
      'demographic'
    ])).toStrictEqual({
      demographic: 'Required'
    });
  });
});
