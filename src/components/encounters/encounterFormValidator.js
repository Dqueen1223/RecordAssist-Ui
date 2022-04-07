/**
 * takes in all user inputs in Create Encounter page
 * and makes an object error messages named errors
 * @param {*} encounterData
 * @returns errors
 */
export default function EncounterFormValidator(encounterData) {
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
  }
  if (isEmpty(encounterData.provider)
  ) {
    errors.provider = 'Provider is required';
  }
  if (isEmpty(encounterData.billingCode)) {
    errors.billingCode = 'BillingCode is required';
  }
  if (isEmpty(encounterData.icd10)) {
    errors.icd10 = 'Idc10 is required';
  } else if (!encounterData.icd10.match(/^[a-zA-Z]{1}\d{2}$/)) {
    errors.icd10 = ' Idc10 must match format of LDD (ex. A12)';
  }
  if (isEmpty(encounterData.totalCost)) {
    errors.totalCost = 'Total cost is required';
  } else if (!/^[0-9]*?.\d{2}$/.test(encounterData.totalCost)) {
    errors.totalCost = 'Total cost must be a number';
  } if (isEmpty(encounterData.copay)) {
    errors.copay = 'Copay is required';
  } else if (!/^[0-9]*?.\d{2}$/.test(encounterData.totalCost)) {
    errors.copay = 'Copay must be a number';
  } if (isEmpty(encounterData.chiefComplaint)) {
    errors.chiefComplaint = 'Chief Complaint is required';
  }
  if (!isEmpty(encounterData.pulse) && !(/^\d*$/).test(encounterData.pulse)) {
    errors.pulse = 'Pulse must be a number';
  }
  if (encounterData.systolic && !(/^\d*$/).test(encounterData.systolic)) {
    errors.systolic = 'Systolic pressure must be a number';
  }
  if (
    !isEmpty(encounterData.diastolic)
    && !(/^\d*$/).test(encounterData.diastolic)
  ) {
    errors.diastolic = 'Diastolic pressure must be a number';
  }
  if (isEmpty(encounterData.date)) {
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
