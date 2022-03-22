import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchPatients
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setPatients sets state for Patients
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for products if 200 response, else sets state for apiError
 */
export default async function fetchPatients(setPatients, setApiError) {
  await HttpHelper(Constants.PATIENTS_ENDPOINT, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.PATiENTS_ENDPOINT);
    })
    .then(setPatients)
    .catch(() => {
      setApiError(true);
    });
}
