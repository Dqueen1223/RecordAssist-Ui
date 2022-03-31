import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
/**
 * @name updateEncounter
 * @description Utilizes HttpHelper to make a PUT request to an API
 * @param {*} encounter updates specified encounter with the given encounter object
 * @param {*} encounter Id to update
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns update for encounters if 200 response, else throws an apiError
 */
export default async function updateEncounter(encounter, encounterId, setApiError) {
  // let checkValid = 'invalid';
  await HttpHelper(
    `${Constants.PATIENTS_ENDPOINT}/${encounter.patientId}${Constants.ENCOUNTERS_ENDPOINT}/${encounterId}`,
    'PUT',
    {
      id: encounter.id,
      patientId: encounter.patientId,
      notes: encounter.notes,
      visitCode: encounter.visitCode,
      provider: encounter.provider,
      billingCode: encounter.billingCode,
      icd10: encounter.icd10,
      totalCost: encounter.totalCost,
      copay: encounter.copay,
      chiefComplaint: encounter.chiefComplaint,
      pulse: encounter.pulse,
      systolic: encounter.systolic,
      diastolic: encounter.diastolic,
      date: encounter.date
    }
  )
    .then((response) => {
      if (response.ok) {
        // checkValid = 'valid';
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .catch(() => {
      setApiError(true);
    });
  // return checkValid;
}
