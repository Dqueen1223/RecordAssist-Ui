import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory, useParams } from 'react-router-dom';
import FormItem from '../form/FormItem';
import createEncounter from './createEncounterService';
import EncounterFormValidator from './encounterFormValidator';
import Constants from '../../utils/constants';

/**
 * @name CreateEncountersPage
 * @description displays CreateEncountersPage page content
 * @return component
 */
const CreateEncountersPage = () => {
  const history = useHistory();
  const { id } = useParams();
  const [encounterData, setEncounterData] = useState([]);
  const [errors, setErrors] = useState([]);
  const [apiError, setApiError] = useState(false);

  const handleEncounter = async () => {
    if (Object.keys(EncounterFormValidator(encounterData)).length === 0) {
      if (await createEncounter(encounterData, id, setApiError) === 'valid') {
        toast.success('New Encounter Has Been Added');
        history.push('/patients');
      }
    } else {
      toast.error('There are invalid fields, please enter valid info');
    }
    setErrors(EncounterFormValidator(encounterData));
  };

  const onEncounterChange = (e) => {
    setEncounterData({ ...encounterData, [e.target.id]: e.target.value });
  };
  return (
    <div className="createPatientInput">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      <div className="form">
        <h1>Create Encounter </h1>
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
        <button onClick={handleEncounter} type="submit" className="submit">
          Add Encounter
        </button>
      </div>
    </div>
  );
};

export default CreateEncountersPage;
