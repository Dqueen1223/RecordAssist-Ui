import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name updatePatientbyId
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns updates patients if 200 response, else sets state for apiError
 */
export default async function updatePatientbyId(patientId, setApiError) {
  await HttpHelper(Constants.PATIENTS_ENDPOINT + patientId, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.PATIENTS_ENDPOINT);
    })
    .catch(() => {
      setApiError(true);
    });
}
