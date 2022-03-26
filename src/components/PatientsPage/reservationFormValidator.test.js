import { cleanup } from '@testing-library/react';
import PatientsFormValidator from './patientsFormValidator';

afterEach(cleanup);
const validForm = {
  firstName: 'Hulk',
  lastName: 'Hogan',
  ssn: '123-45-6789',
  email: 'hulksnewemaewiladdress@wwf.com',
  age: 66,
  height: 79,
  weight: 299,
  insurance: 'Self-Insured',
  gender: 'Male',
  street: '8430 W Sunset Blvd',
  city: 'Los Angeles',
  state: 'CA',
  postal: '90049'
};
const invalidForm = {
  firstName: 'Hulk',
  lastName: 'Hogan',
  ssn: '123-45-6789',
  email: 'hulksnewemaewiladdreswwf.com',
  age: 'easd',
  height: 'e9',
  weight: 'e99',
  insurance: 'Self-Insured',
  gender: 'Hulk',
  street: '8430 W Sunset Blvd',
  city: 'Los Angeles',
  state: 'CALi',
  postal: 'ewas'
};
describe('Create and Edit reservation validation', () => {
  test('Empty fields return required error', () => {
    expect(PatientsFormValidator({})).toStrictEqual({
      age: 'Must have an age',
      city: 'Must have a city',
      email: 'The email field is required',
      firstName: 'Must have a firstName',
      gender: 'Must have a gender',
      height: 'Must have a height',
      insurance: 'Must have Insurance',
      lastName: 'Must have a lastName',
      postal: 'Must include a zip code',
      ssn: 'Must have a ssn',
      state: 'Must select a state',
      street: 'Must have a street',
      weight: 'Must have a weight'
    });
  });
  test('Valid fields give no errors', () => {
    expect(PatientsFormValidator(validForm)).toStrictEqual({});
  });
  test('invalid form returns errors', () => {
    expect(PatientsFormValidator(invalidForm)).toStrictEqual({
      age: 'Patient age must be a number',
      email: 'Must be a valid email (ex.test@test.com)',
      gender: 'Gender must be "Male", "Female", or "Other"',
      state: 'State must have a valid two letter state code (ex. MD)',
      height: 'Patient height must be a number',
      weight: 'Patient weight must be a number',
      postal: 'Must be a valid zip (ex. 12345 or 12345-6789)'
    });
  });
});
