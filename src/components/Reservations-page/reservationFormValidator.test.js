import { cleanup } from '@testing-library/react';
import { afterEach } from 'mocha';
import reservationFormValidator from './reservationFormValidator';

afterEach(cleanup);
const validForm = {
  guestEmail: 'E@gmail.com',
  checkInDate: '03-31-2222',
  numberOfNights: 3
};
const invalidForm = {
  guestEmail: 'gmail.com',
  checkInDate: '30-pp-2231',
  numberOfNights: 0
};
describe('Create and Edit reservation', () => {
  test('Empty fields return required error', () => {
    expect(reservationFormValidator({})).toStrictEqual({
      guestEmail: 'The email field is required',
      checkInData: 'The check in field is required',
      numberOfNights: 'The nights field is required'
    });
  });
  test('Valid fields give no errors', () => {
    expect(reservationFormValidator(validForm)).toStrictEqual({});
  });
  test();
});
