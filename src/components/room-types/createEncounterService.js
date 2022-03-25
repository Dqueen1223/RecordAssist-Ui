import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export default async function createEncounter(encounterData, patientId, setApiError) {
  // let checkValid = 'invalid';
  await HttpHelper(`${Constants.PATIENTS_ENDPOINT}/${patientId}/${Constants.ROOMTYPES_ENDPOINT}`, 'POST', {
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
        // checkValid = 'valid';
        response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      setApiError(true);
    });
  // return checkValid;
}
