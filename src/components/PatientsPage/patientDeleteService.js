import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name DeletePatient
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} Patient to be deleted
 * @param {*} setApiError sets error if response other than 200 or 409 is returned
 * @param {*} setConflictError sets error if the patient has associated encounters
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function DeletePatient(patient, setApiError) {
  let checkValid = 'invalid';
  await HttpHelper(
    `${Constants.PATIENTS_ENDPOINT}/${patient.id}`,
    'DELETE'
  ).then((response) => {
    if (response.ok) {
      checkValid = 'valid';
      toast.success(`${patient.lastName}, ${patient.firstName} has been deleted `);
      return checkValid;
    }
    if (response.status === 409) {
      toast.error(`${patient.lastName}, ${patient.firstName} has encounters and cannot be deleted`);
      throw new Error(response.statusText);
    } else {
      setApiError(true);
    }
    throw new Error(response.statusText);
  });
  return checkValid;
}
