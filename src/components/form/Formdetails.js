import React from 'react';

const EncounterDetails = ({ encounterData }) => (
  <>
    <p>
      Id:
      {' '}
      {encounterData.id}
    </p>
    <p>
      Notes:
      {' '}
      {encounterData.notes}
    </p>
    <p>
      Visit code:
      {' '}
      {encounterData.visitCode}
    </p>
    <p>
      Provider:
      {' '}
      {encounterData.provider}
    </p>
    <p>
      Billing Code:
      {' '}
      {encounterData.billingCode}
    </p>
    <p>
      Icd10:
      {' '}
      {encounterData.icd10}
    </p>
    <p>
      Total cost:
      {' '}
      {encounterData.totalCost}
    </p>
    <p>
      Copay:
      {' '}
      {encounterData.copay}
    </p>
    <p>
      Chief Complaint:
      {' '}
      {encounterData.chiefComplaint}
    </p>
    {encounterData.pulse && (
    <p>
      Pulse:
      {' '}
      {encounterData.pulse}
    </p>
    )}
    {!encounterData.pulse && (
    <p>
      Pulse:
      {' '}
      N/A
    </p>
    )}
    {encounterData.systolic && (
    <p>
      Systolic:
      {' '}
      {encounterData.systolic}
    </p>
    )}
    {!encounterData.systolic && (
    <p>
      Systolic:
      {' '}
      N/A
    </p>
    )}
    {encounterData.diastolic && (
      <p>
        Diastolic pressure:
        {' '}
        {encounterData.diastolic}
      </p>
    )}
    {!encounterData.diastolic && (
    <p>
      Diastolic pressure:
      {' '}
      N/A
    </p>
    )}
    <p>
      Date:
      {' '}
      {encounterData.date}
    </p>
  </>
);

export default EncounterDetails;
