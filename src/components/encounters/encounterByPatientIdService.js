import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

/**
 *
 * @name fetchEncounterByPatientId
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} setEncounters sets state for encounters
 * @param {*} patient Id to besearched for
 * @param {*} setApiError sets error if response other than 200 or 404 is returned
 * @param {*} setNotFoundError set error if there is a 404
 * @returns sets state for encounters if 200 response, else sets state for apiError
 */
export default async function fetchEncounterByPatientId(
  setEncounters,
  Id,
  setApiError,
  setNotFoundError
) {
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${Id}${Constants.ENCOUNTERS_ENDPOINT}`, 'GET')
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      if (response.status === 404) {
        setNotFoundError(true);
        throw new Error(response.statusText);
      } else if (response.status !== 200) {
        setApiError(true);
      }
      throw new Error(response.statusText);
    })
    .then(setEncounters);
}
