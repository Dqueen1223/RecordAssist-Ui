import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';
/**
 *
 * @name createPatient
 * @description Utilizes HttpHelper to make a get request to an API
 * @param {*} encounter object to create
 * @param {*} patientId assocaited with encounter
 * @param {*} setApiError sets error if response other than 200 is returned
 * @returns sets state for encounter if 200 response, else sets state for apiError
 */
export default async function createEncounter(encounterData, patientId, setApiError) {
  let checkValid = 'invalid';
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}${Constants.ENCOUNTERS_ENDPOINT}`, 'POST', {
    patientId,
    notes: encounterData.notes,
    visitCode: encounterData.visitCode,
    provider: encounterData.provider,
    billingCode: encounterData.billingCode,
    icd10: encounterData.icd10,
    totalCost: encounterData.totalCost,
    copay: encounterData.copay,
    chiefComplaint: encounterData.chiefComplaint,
    pulse: encounterData.pulse,
    systolic: encounterData.systolic,
    diastolic: encounterData.diastolic,
    date: encounterData.date
  })
    .then((response) => {
      if (response.ok) {
        response.json();
        checkValid = 'valid';
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      setApiError(true);
    });
  return checkValid;
}
