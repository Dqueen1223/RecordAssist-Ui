import { cleanup } from '@testing-library/react';
import PatientsFormValidator from './patientsFormValidator';

afterEach(cleanup);
const validForm = {
  firstName: "Hulk",
  lastName: "Hogan",
  ssn: "123-45-6789",
  email: "hulksnewemaewiladdress@wwf.com",
  age: 66,
  height: 79,
  weight: 299,
  insurance: "Self-Insured",
  gender: "Male",
  street: "8430 W Sunset Blvd",
  city: "Los Angeles",
  state: "CA",
  postal: "90049"
};
const invalidForm = {
  firstName: "Hulk",
  lastName: "Hogan",
  ssn: "123-45-6789",
  email: "hulksnewemaewiladdreswwf.com",
  age: '66',
  height: '79',
  weight: '299',
  insurance: "Self-Insured",
  gender: "Hulk",
  street: "8430 W Sunset Blvd",
  city: "Los Angeles",
  state: "CALi",
  postal: "9004339",
};
const somewhatValidForm = {
  guestEmail: 'something@gmail.com',
  checkInDate: '33-33-3333',
  numberOfNights: 9,
  roomType: 1
};
describe('Create and Edit reservation validation', () => {
  test('Empty fields return required error', () => {
    expect(PatientsFormValidator({})).toStrictEqual({
      firstName: 'The email field is required',
      la: 'The check in field is required',
      numberOfNights: 'The nights field is required',
      roomType: 'Must select a room type'
    });
  });
  test('Valid fields give no errors', () => {
    expect(PatientsFormValidator(validForm)).toStrictEqual({});
  });
//   test('invalid form returns errors', () => {
//     expect(
//       PatientsFormValidator(invalidForm).toStrictEqual({
//         guestEmail: 'Must be a valid email',
//         checkInDate: 'Date must be mm-dd-yyyy',
//         numberOfNights: 'Must be number greater than zero'
//       })
//     );
//   });
//   test('somewhatValidForm returns error', () => {
//     expect(
//       PatientsFormValidator(somewhatValidForm).toStrictEqual({
//         checkInDate: 'Must be a valid date'
//       })
//     );
//   });
});
