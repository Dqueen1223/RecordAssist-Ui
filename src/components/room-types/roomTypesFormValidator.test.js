import { cleanup } from '@testing-library/react';
import roomTypesFormValidator from './roomTypesFormValidator';

afterEach(cleanup);

const validForm = {
  name: 'Exquisite',
  rate: 123.99
};
const invalidForm = {
  name: 'eq',
  rate: 133
};

describe('Create and Edit room validation', () => {
  test('Empty fields return required error', () => {
    expect(roomTypesFormValidator({})).toStrictEqual({
      name: 'The name field is required',
      rate: 'The rate field is required'
    });
  });
  test('Valid fields give no errors', () => {
    expect(roomTypesFormValidator(validForm)).toStrictEqual({});
  });
  test('invalid form returns errors', () => {
    expect(
      roomTypesFormValidator(invalidForm).toStrictEqual({
        name: 'Must be at least 3 characters',
        rate: 'Must be number greater than zero'
      })
    );
  });
});
