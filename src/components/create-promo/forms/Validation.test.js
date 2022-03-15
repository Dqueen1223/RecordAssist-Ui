import { cleanup } from '@testing-library/react';
import generateErrors from './FormValidation';

afterEach(cleanup);

describe('Validatefrom', () => {
  test('valid code returns true', () => {
    expect(generateErrors([{ id: 'code', value: '23XY7' }], 1)).toBeTruthy();
  });
  test('twoDecimal returns right error message', () => {
    expect(
      generateErrors({ discount: 2.0, type: '$' }, ['price'])
    ).toStrictEqual({
      discount: 'Requires two decimals'
    });
  });
  test('null discount value returns required', () => {
    expect(
      generateErrors({ price: null }, ['price'])
    ).toStrictEqual({
      price: 'Required'
    });
  });
  test('null code value returns required', () => {
    expect(
      generateErrors({ code: null }, ['code'])
    ).toStrictEqual({
      code: 'Required'
    });
  });
  test('multiple fields return correct error', () => {
    expect(
      generateErrors({
        price: null, quantity: -40, type: '$'
      }, [
        'code',
        'discount'
      ])
    ).toStrictEqual({
      price: 'Required',
      quantity: 'No Negative Amount'
    });
  });
});
