import { cleanup } from '@testing-library/react';
import reservationFormValidator from './reservationFormValidator';

afterEach(cleanup);
const validForm = {
  guestEmail: 'E@gmail.com',
  checkInDate: '03-31-2222',
  numberOfNights: 3,
  roomTypeId: 1
};
const invalidForm = {
  guestEmail: 'gmail.com',
  checkInDate: '30-pp-2231',
  numberOfNights: 0
};
const somewhatValidForm = {
  guestEmail: 'something@gmail.com',
  checkInDate: '33-33-3333',
  numberOfNights: 9,
  roomType: 1
};
describe('Create and Edit reservation validation', () => {
  test('Empty fields return required error', () => {
    expect(reservationFormValidator({})).toStrictEqual({
      guestEmail: 'The email field is required',
      checkInDate: 'The check in field is required',
      numberOfNights: 'The nights field is required',
      roomType: 'Must select a room type'
    });
  });
  test('Valid fields give no errors', () => {
    expect(reservationFormValidator(validForm)).toStrictEqual({});
  });
  test('invalid form returns errors', () => {
    expect(
      reservationFormValidator(invalidForm).toStrictEqual({
        guestEmail: 'Must be a valid email',
        checkInDate: 'Date must be mm-dd-yyyy',
        numberOfNights: 'Must be number greater than zero'
      })
    );
  });
  test('somewhatValidForm returns error', () => {
    expect(
      reservationFormValidator(somewhatValidForm).toStrictEqual({
        checkInDate: 'Must be a valid date'
      })
    );
  });
});
