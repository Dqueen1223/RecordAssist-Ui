import { cleanup } from '@testing-library/react';
import validateForm from './FormValidate';

// Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0
// unmount and cleanup DOM after the test is finished.
afterEach(cleanup);
const validDeliveryData = {
  firstName: 'First',
  lastName: 'Last',
  street: '123 Street St',
  city: 'City',
  state: 'Oregon',
  zip: '00000'
};
const validBillingData = {
  billingStreet: '123 Street St',
  billingCity: 'City',
  billingState: 'Oregon',
  billingZip: '00000',
  email: 'name@site.com',
  phone: '1234567890',
  creditCard: '4123567812345678',
  cvv: '123',
  cardholder: 'First Last',
  expiration: '05/25'
};
const noFieldsChecked = {
  cardholder: 'The cardholder field is required',
  city: 'The city field is required',
  creditCard: 'The credit card field is required',
  cvv: 'The cvv field is required',
  email: 'The email field is required',
  expiration: 'The expiration field is required',
  firstName: 'The first name field is required',
  lastName: 'The last name field is required',
  phone: 'The phone field is required',
  state: 'The state field is required',
  street: 'The street field is required',
  zip: 'The zip field is required'
};
const noFieldsUnchecked = {
  billingCity: 'The city field is required',
  billingState: 'The state field is required',
  billingStreet: 'The street field is required',
  billingZip: 'The zip field is required',
  cardholder: 'The cardholder field is required',
  city: 'The city field is required',
  creditCard: 'The credit card field is required',
  cvv: 'The cvv field is required',
  email: 'The email field is required',
  expiration: 'The expiration field is required',
  firstName: 'The first name field is required',
  lastName: 'The last name field is required',
  phone: 'The phone field is required',
  state: 'The state field is required',
  street: 'The street field is required',
  zip: 'The zip field is required'
};
describe('getQuantityInCart', () => {
  // all filled or unfilled tests
  test('Valid info with billing info ticked', () => {
    expect(validateForm(validDeliveryData, validBillingData, true)).toStrictEqual({});
  });
  test('Valid info with billing info unticked', () => {
    expect(validateForm(validDeliveryData, validBillingData, false)).toStrictEqual({});
  });
  test('Nothing filled out, with same billing info ticked', () => {
    expect(validateForm({}, {}, true)).toStrictEqual(noFieldsChecked);
  });
  test('Nothing filled out, with same billing info unticked', () => {
    expect(validateForm({}, {}, false)).toStrictEqual(noFieldsUnchecked);
  });
  // specific validation tests
  test('Invalid Name fields', () => {
    const invalidDeliveryName = { ...validDeliveryData };
    const invalidBillingName = { ...validBillingData };
    invalidDeliveryName.firstName = 'F$irst';
    invalidDeliveryName.lastName = 'Las@t';
    invalidBillingName.cardholder = 'First@last';
    expect(validateForm(invalidDeliveryName, invalidBillingName, true)).toStrictEqual(
      {
        firstName: 'Name fields may only contain letters, numbers, spaces, hyphens, and apostrophes',
        lastName: 'Name fields may only contain letters, numbers, spaces, hyphens, and apostrophes',
        cardholder: 'Name fields may only contain letters, numbers, spaces, hyphens, and apostrophes'
      }
    );
  });
  test('Invalid Zip fields', () => {
    const invalidDeliveryZip = { ...validDeliveryData };
    const invalidBillingZip = { ...validBillingData };
    invalidDeliveryZip.zip = '123456789';
    invalidBillingZip.billingZip = '12345 67890';
    expect(validateForm(invalidDeliveryZip, invalidBillingZip, false)).toStrictEqual(
      {
        zip: 'The zip field must be in the format 12345 or 12345-6789',
        billingZip: 'The zip field must be in the format 12345 or 12345-6789'
      }
    );
  });
  test('Invalid Email', () => {
    const invalidBillingEmail = { ...validBillingData };
    invalidBillingEmail.email = 'nota@valid@email.com';
    expect(validateForm(validDeliveryData, invalidBillingEmail, false)).toStrictEqual(
      {
        email: 'The email address must be valid'
      }
    );
  });
  test('Invalid Credit Card Characters', () => {
    const invalidBillingCreditCard = { ...validBillingData };
    invalidBillingCreditCard.creditCard = '423456f7890123456';
    expect(validateForm(validDeliveryData, invalidBillingCreditCard, false)).toStrictEqual(
      {
        creditCard: 'Credit card numbers may not contain non-numbers'
      }
    );
  });
  test('Invalid Credit Card Provider', () => {
    const invalidBillingCreditCard = { ...validBillingData };
    invalidBillingCreditCard.creditCard = '1234567890123456';
    expect(validateForm(validDeliveryData, invalidBillingCreditCard, false)).toStrictEqual(
      {
        creditCard: 'This credit card provider is not supported'
      }
    );
  });
  test('Invalid Credit Card Length', () => {
    const invalidBillingCreditCard = { ...validBillingData };
    invalidBillingCreditCard.creditCard = '42345678901234';
    expect(validateForm(validDeliveryData, invalidBillingCreditCard, false)).toStrictEqual(
      {
        creditCard: 'The credit card number must be between 16 and 19 digits'
      }
    );
  });
  test('Invalid Cvv Characters', () => {
    const invalidBillingCvv = { ...validBillingData };
    invalidBillingCvv.cvv = '12f';
    expect(validateForm(validDeliveryData, invalidBillingCvv, false)).toStrictEqual(
      {
        cvv: 'The cvv must be only numbers'
      }
    );
  });
  test('Invalid Cvv length', () => {
    const invalidBillingCvv = { ...validBillingData };
    invalidBillingCvv.cvv = '1234';
    expect(validateForm(validDeliveryData, invalidBillingCvv, false)).toStrictEqual(
      {
        cvv: 'The cvv field must be exactly 3 digits long'
      }
    );
  });
  test('Invalid Date Format', () => {
    const invalidBillingDate = { ...validBillingData };
    invalidBillingDate.expiration = '12//02';
    expect(validateForm(validDeliveryData, invalidBillingDate, false)).toStrictEqual(
      {
        expiration: 'Dates must match format "MM/YY"'
      }
    );
  });
  test('Invalid Date card is expired', () => {
    const invalidBillingDate = { ...validBillingData };
    invalidBillingDate.expiration = '12/01';
    expect(validateForm(validDeliveryData, invalidBillingDate, false)).toStrictEqual(
      {
        expiration: 'This card is expired'
      }
    );
  });
  test('Invalid Date card is expired 20xx', () => {
    const invalidBillingDate = { ...validBillingData };
    invalidBillingDate.expiration = '02/01';
    expect(validateForm(validDeliveryData, invalidBillingDate, false)).toStrictEqual(
      {
        expiration: 'This card is expired'
      }
    );
  });
  test('Invalid Date card is expired 19xx', () => {
    const invalidBillingDate = { ...validBillingData };
    invalidBillingDate.expiration = '12/99';
    expect(validateForm(validDeliveryData, invalidBillingDate, false)).toStrictEqual(
      {
        expiration: 'This card is expired'
      }
    );
  });
  test('Invalid Date month out of bounds', () => {
    const invalidBillingDate = { ...validBillingData };
    invalidBillingDate.expiration = '24/07';
    expect(validateForm(validDeliveryData, invalidBillingDate, false)).toStrictEqual(
      {
        expiration: 'This month does not exist'
      }
    );
  });
});
