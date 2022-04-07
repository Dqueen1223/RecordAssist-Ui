import { toast } from 'react-toastify';
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
export default async function updatePatient(patient, patientId, setApiError, setConflictError) {
  let checkValid = 'invalid';
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}`, 'PUT', {
    id: patientId,
    firstName: patient.firstName,
    lastName: patient.lastName,
    ssn: patient.ssn,
    email: patient.email,
    age: patient.age,
    height: patient.height,
    weight: patient.weight,
    insurance: patient.insurance,
    gender: patient.gender,
    street: patient.street,
    city: patient.city,
    state: patient.state,
    postal: patient.postal
  })
    // eslint-disable-next-line consistent-return
    .then((response) => {
      if (response.ok) {
        checkValid = 'valid';
        return response.json();
      }
      if (response.status === 409) {
        setConflictError(true);
        toast.error('There are invalid fields, please enter valid info');
      } else {
        setApiError(true);
      }
    });
  return checkValid;
}
