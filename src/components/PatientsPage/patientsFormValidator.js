/**
 * takes in all user inputs in Create patients page
 * and makes an object error messages named errors
 * @param {*} patientData
 * @returns errors
 */
export default function PatientsFormValidator(patientData) {
  const errors = {};
  const isEmpty = (PatientInfo) => {
    if (PatientInfo === undefined
      || PatientInfo === null
      || PatientInfo === '') { return true; }
    return false;
  };
  if (isEmpty(patientData.firstName)) {
    errors.firstName = 'Must have a firstName';
  }
  if (isEmpty(patientData.LastName)) {
    errors.LastName = 'Must have a lastName';
  }
  if (isEmpty(patientData.street)) {
    errors.street = 'Must have a street';
  }
  if (isEmpty(patientData.city)) {
    errors.city = 'Must have a city';
  }
  if (isEmpty(patientData.insurance)) {
    errors.insurance = 'Must have insurance';
  }
  if (isEmpty(patientData.email)) {
    errors.email = 'The email field is required';
  } else if (
    !/[a-z0-9]+([_a-z0-9.-]*[a-z0-9]+)?@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]+$)/iy.test(
      patientData.email
    )
  ) {
    errors.email = 'Must be a valid email (ex.test@test.com)';
  }
  if (isEmpty(patientData.age)) {
    errors.age = 'Must have an age';
  } else if (Number.isNaN(patientData.age)) {
    errors.age = 'Patient age must be a number';
  }
  if (isEmpty(patientData.height)) {
    errors.roomType = 'Must have a height';
  } else if (Number.isNaN(patientData.height)) {
    errors.age = 'Patient height must be a number';
  }
  if (isEmpty(patientData.weight)) {
    errors.roomType = 'Must have a weight';
  } else if (Number.isNaN(patientData.weight)) {
    errors.age = 'Patient weight must be a number';
  }
  if (isEmpty(patientData.state)) {
    errors.state = 'Must select a state';
  } else if (patientData.state.length !== 2) {
    errors.state = 'State must have a valid two letter state code (ex. MD)';
  }
  if (isEmpty(patientData.ssn)) {
    errors.ssn = 'Must have a ssn';
  } else if (!patientData.ssn.match(/\d{3}-\d{2}-\d{3}$/)) {
    errors.ssn = 'Must be a valid ssn (ex. 123-45-6798)';
  }
  if (isEmpty(patientData.postal)) {
    errors.postal = 'Must include a zipCode';
  } else if (!patientData.postal.match(/\d{5}$/) || !patientData.postal.match(/\d{5}-\d{4}$/)) {
    errors.postal = 'Must be a valid zip (ex. 12345 or 12345-6789)';
  }
  if (isEmpty(patientData.gender)) {
    errors.gender = 'Must have a gender';
  } else if (patientData.gender !== 'Male' || patientData.gender !== 'Female'
    || patientData.gender !== 'Other') {
    errors.gender = 'Gender must be "Male", "Female", or "Other"';
  }
}
