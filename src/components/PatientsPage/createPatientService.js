import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name createPatient
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} patient to create
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for patient if 200 response, else sets state for apiError
 */
export default async function createPatient(
  patient, setApiError, setConflictError
) {
  let checkValid = 'invalid';
  await HttpHelper(Constants.PATIENTS_ENDPOINT, 'POST', {
    firstName: patient.firstName,
    lastName: patient.lastName,
    ssn: patient.ssn,
    email: patient.email,
    street: patient.street,
    city: patient.city,
    state: patient.state,
    postal: patient.postal,
    age: patient.age,
    height: patient.height,
    weight: patient.weight,
    insurance: patient.insurance,
    gender: patient.gender
  })
    .then((response) => {
      if (response.ok) {
        checkValid = 'valid';
        return response.json();
      }
      if (response.status === 409) {
        setConflictError(true);
        throw new Error(response.statusText);
      } else {
        setApiError(true);
      }
      throw new Error(response.statusText);
    });
  return checkValid;
}
