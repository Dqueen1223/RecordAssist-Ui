/**
 * takes in all user inputs in Create Encounter page
 * and makes an object error messages named errors
 * @param {*} encounterData
 * @returns errors
 */
export default function RoomTypeFormValidator(encounterData) {
  const errors = {};
  const isEmpty = (encounterInfo) => {
    if (
      encounterInfo === undefined
      || encounterInfo === null
      || encounterInfo === ''
    ) {
      return true;
    }
    return false;
  };
  if (isEmpty(encounterData.visitCode)
  ) {
    errors.visitCode = 'Visit Code is required';
  } else if (
    !encounterData.visitCode.match(
      /[a-zA-Z]{1}\d{1}[a-zA-Z]{1}\s\d{1}[a-zA-Z]{1}\d{1}$/
    )
  ) {
    errors.visitCode = 'Visit Code Format must match LDL DLD (ex. A1S 2D3)';
  }
  if (isEmpty(encounterData.provider)
  ) {
    errors.provider = 'Provider is required';
  }
  if (isEmpty(encounterData.billingCode)) {
    errors.billingCode = 'BillingCode is required';
  } else if (!encounterData.billingCode.match(/\d{3}\.\d{3}\.\d{3}-\d{2}$/)) {
    errors.billingCode = 'BillingCode must match format of xxx.xxx.xxx-xx (ex. 123.456.789-12)';
  }
  if (isEmpty(encounterData.icd10)) {
    errors.icd10 = 'idc10 is required';
  } else if (!encounterData.icd10.match(/[a-zA-Z]{1}\d{2}$/)) {
    errors.icd10 = ' idc10 must match format of LDD (ex. A12)';
  }
  if (isEmpty(encounterData.totalCost)) {
    errors.totalCost = 'Total cost is required';
  } else if (Number.isNaN(encounterData.totalCost)) {
    errors.totalCost = 'Total cost must be a number';
  } if (isEmpty(encounterData.copay)) {
    errors.copay = 'copay is required';
  } else if (Number.isNaN(encounterData.copay)) {
    errors.copay = 'copay must be a number';
  } if (isEmpty(encounterData.chiefComplaint)) {
    errors.chiefComplaint = 'chief Complaint is required';
  }
  if (Number.isNaN(encounterData.pulse)) {
    errors.pulse = 'Pulse must be a number';
  }
  if (Number.isNaN(encounterData.systolic)) {
    errors.systolic = 'Systolic pressure must be a number';
  }
  if (Number.isNaN(encounterData.diastolic)) {
    errors.diastolic = 'Diastolic pressure must be a number';
  }
  if (encounterData.date) {
    errors.date = 'Date is required';
  } else if (
    !encounterData.date.match(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/
    )
  ) {
    errors.date = 'Date must match format YYYY-MM-DD  (ex. 2020-01-01)';
  }
  return errors;
}