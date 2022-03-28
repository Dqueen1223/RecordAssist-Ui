import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
/**
 * @name updatePatient
 * @description Utilizes HttpHelper to make a PUT request to an API
 * @param {*} patient updates specified patient with the given patient object
 * @param {*} patientId the patient id to update
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns update for patients if 200 response, else throws an apiError
 */
export default async function updatePatient(patient, patientId, setApiError) {
  let checkValid = 'invalid';
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}`, 'PUT', {
    firstName: patient.firstName,
    lastName: patient.lastNmae,
    ssn: patient.ssn,
    email: patient.email,
    age: patient.age,
    height: patient.height,
    insurance: patient.Insurance,
    gender: patient.gender,
    street: patient.street,
    city: patient.city,
    state: patient.state,
    postal: patient.postal
  })
    .then((response) => {
      if (response.ok) {
        checkValid = 'valid';
        return response.json();
      }
      throw new Error(Constants.PATIENTS_ENDPOINT);
    })
    .catch(() => {
      setApiError(true);
    });
  return checkValid;
}
