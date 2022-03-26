import { cleanup } from '@testing-library/react';
import EncounterFormValidator from './encounterFormValidator';

afterEach(cleanup);

const validForm = {
  billingCode: '123.456.789-00',
  chiefComplaint: 'new complaint',
  copay: 0,
  date: '2020-08-04',
  diastolic: null,
  icd10: 'Z99',
  notes: 'new encounter Whoadwdwed',
  provider: 'New Hospital',
  pulse: null,
  systolic: null,
  totalCost: 343.11,
  visitCode: 'N3W 3C3'
};
const invalidForm = {
  billingCode: '133.eee.32qwe',
  chiefComplaint: 'hello',
  copay: 'eee',
  date: '12-12-2021',
  diastolic: 'eaew',
  icd10: 'Zdd9',
  notes: 'new encounter Whoadwdwed',
  provider: 'New Hospital',
  pulse: 'null',
  systolic: 'null',
  totalCost: '343.11',
  visitCode: 'N3W 3Cee3'
};
describe('Create and Edit encounter validation', () => {
  test('Empty fields return required error', () => {
    expect(EncounterFormValidator({})).toStrictEqual({
      visitCode: 'Visit Code is required',
      chiefComplaint: 'Chief Complaint is required',
      provider: 'Provider is required',
      billingCode: 'BillingCode is required',
      icd10: 'Idc10 is required',
      totalCost: 'Total cost is required',
      copay: 'Copay is required',
      date: 'Date is required'
    });
  });
  test('Valid fields give no errors', () => {
    expect(EncounterFormValidator(validForm)).toStrictEqual({});
  });
  test('Invalid fields return invalid messages', () => {
    expect(EncounterFormValidator(invalidForm)).toStrictEqual({
      visitCode: 'Visit Code Format must match LDL DLD (ex. A1S 2D3)',
      billingCode: 'BillingCode must match format of xxx.xxx.xxx-xx (ex. 123.456.789-12)',
      copay: 'Copay must be a number',
      date: 'Date must match format YYYY-MM-DD  (ex. 2020-01-01)',
      diastolic: 'Diastolic pressure must be a number',
      icd10: ' Idc10 must match format of LDD (ex. A12)',
      pulse: 'Pulse must be a number',
      systolic: 'Systolic pressure must be a number'
    });
  });
});
