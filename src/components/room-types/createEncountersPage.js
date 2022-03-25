import React, { useState } from 'react';
import FormItem from '../form/FormItem';
import createEncounter from './createEncounterService';
import EncounterFormValidator from './encountersFormValidator';
import Constants from '../../utils/constants';

/**
 * @name CreateEncountersPage
 * @description displays CreateReservation page content
 * @return component
 */
const CreateEncountersPage = () => {
//   const { id } = useParams();
  const [patientData, setPatientData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState(false);

  const handleEncounter = async () => {
    if (Object.keys(EncounterFormValidator(patientData)).length === 0) {
      await createEncounter(patientData, setApiError);
    }
    setErrors(EncounterFormValidator(patientData));
  };

  const onEncounterChange = (e) => {
    setPatientData({ ...patientData, [e.target.id]: e.target.value });
  };
  return (
    <div className="createPatientInput">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      <FormItem
        type="text"
        id="notes"
        onChange={onEncounterChange}
        label="Notes"
      />
      <div>
        <FormItem
          type="text"
          id="visitCode"
          onChange={onEncounterChange}
          label="visit code"
        />
      </div>
      <div className="errors">{errors.visitCode}</div>
      <div>
        <FormItem
          type="text"
          id="provider"
          onChange={onEncounterChange}
          label="provider"
        />
      </div>
      <div className="errors">{errors.provider}</div>
      <div>
        <FormItem
          type="email"
          id="billingCode"
          onChange={onEncounterChange}
          label="Billing code"
        />
      </div>
      <div className="errors">{errors.billingCode}</div>
      <div>
        <FormItem
          type="text"
          id="icd10"
          onChange={onEncounterChange}
          label="Icd10"
        />
      </div>
      <div className="errors">{errors.icd10}</div>
      <div>
        <FormItem
          type="text"
          id="totalCost"
          onChange={onEncounterChange}
          label="Total cost"
        />
      </div>
      <div className="errors">{errors.totalCost}</div>
      <div>
        <FormItem
          type="text"
          id="copay"
          onChange={onEncounterChange}
          label="Copay"
        />
      </div>
      <div className="errors">{errors.copay}</div>
      <div>
        <FormItem
          type="text"
          id="chiefComplaint"
          onChange={onEncounterChange}
          label="Chief Complaint"
        />
      </div>
      <div className="errors">{errors.chiefComplaint}</div>
      <div>
        <FormItem
          type="text"
          id="pulse"
          onChange={onEncounterChange}
          label="Pulse"
        />
      </div>
      <div className="errors">{errors.pulse}</div>
      <div>
        <FormItem
          type="text"
          id="systolic"
          onChange={onEncounterChange}
          label="Systolic"
        />
      </div>
      <div className="errors">{errors.systolic}</div>
      <div>
        <FormItem
          type="text"
          id="diastolic"
          onChange={onEncounterChange}
          label="Diastolic"
        />
      </div>
      <div className="errors">{errors.diastolic}</div>
      <div>
        <FormItem
          type="text"
          id="date"
          onChange={onEncounterChange}
          label="Date"
        />
        <div className="errors">{errors.date}</div>
      </div>
      <button onClick={handleEncounter} type="submit">
        Create
      </button>
    </div>
  );
};

export default CreateEncountersPage;
