import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchPatientById
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setPatient sets state for patients
 * @param {*} patientId to be searched
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function fetchPatientById(setPatient, patientId, setApiError) {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.PATIENTS_ENDPOINT);
    })
    .then(setPatient)
    .catch(() => {
      setApiError(true);
    });
}
