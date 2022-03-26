import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FormItem from '../form/FormItem';
import EncounterFormValidator from './encounterFormValidator';
import Constants from '../../utils/constants';
import '../PatientsPage/Reservations.modules.css';
import fetchEncountersByPatientId from '../PatientsPage/encountersByIdService';
import updateEncounter from './editRoomTypeUpdateService';

/**
 * @name EncounterDetailsPage
 * @description displays encounter details page content
 * @return component
 */
const EncounterDetailsPage = () => {
  const { id } = useParams();
  const [apiError, setApiError] = useState(false);
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState([]);
  const [encounterData, setEncounterData] = useState([]);
  const [notFoundError, setNotFoundError] = useState(false);

  useEffect(() => {
    fetchEncountersByPatientId(
      setEncounterData,
      id,
      setApiError,
      setNotFoundError
    );
  }, [id]);

  const handleSubmitEdit = async () => {
    if (Object.keys(EncounterFormValidator(encounterData)).length === 0) {
      await updateEncounter(encounterData, id, setApiError);
    }
    setErrors(EncounterFormValidator(encounterData));
  };
  const onPatientChange = (e) => {
    setEncounterData({ ...encounterData, [e.target.id]: e.target.value });
  };
  return (
    <div className="patientsDetails">
      {apiError && (
        <p className="errors" data-testid="errors">
          {Constants.API_ERROR}
        </p>
      )}
      {notFoundError && (
        <p className="errors" data-testid="errors">
          This encounter could not be found
        </p>
      )}
      <div>
        {edit && (
          <>
            <div>
              <button type="button" onClick={() => setEdit(false)}>
                Cancel edit
              </button>
            </div>
            <div className="editPatient">
              <div>
                <FormItem
                  type="text"
                  id="notes"
                  value={encounterData.notes}
                  onChange={onPatientChange}
                  label="Notes"
                />
              </div>
              <div className="errors">{errors.notes}</div>
              <div>
                <FormItem
                  type="visitCode"
                  id="visitCode"
                  value={encounterData.visitCode}
                  label="visit Code"
                />
              </div>
              <div className="errors">{errors.visitCode}</div>
              <div>
                <FormItem
                  type="provider"
                  id="provider"
                  value={encounterData.provider}
                  onChange={onPatientChange}
                  label="provider"
                />
              </div>
              <div className="errors">{errors.provider}</div>
              <div>
                <FormItem
                  type="text"
                  id="billingCode"
                  value={encounterData.billingCode}
                  onChange={onPatientChange}
                  label="Billing Code"
                />
              </div>
              <div className="errors">{errors.billingCode}</div>
              <div>
                <FormItem
                  type="text"
                  id="icd10"
                  value={encounterData.icd10}
                  onChange={onPatientChange}
                  label="Icd10"
                />
              </div>
              <div className="errors">{errors.icd10}</div>
              <div>
                <FormItem
                  type="text"
                  id="totalCost"
                  value={encounterData.totalCost}
                  onChange={onPatientChange}
                  label="Total cost"
                />
              </div>
              <div>
                <FormItem
                  type="text"
                  id="copay"
                  value={encounterData.copay}
                  onChange={onPatientChange}
                  label="Copay"
                />
              </div>
              <div className="errors">{errors.copay}</div>
              <div>
                <FormItem
                  type="text"
                  id="chiefComplaint"
                  value={encounterData.chiefComplaint}
                  onChange={onPatientChange}
                  label="Chief complaint"
                />
              </div>
              <div className="errors">{errors.chiefComplaint}</div>
              <div>
                <FormItem
                  type="text"
                  id="pulse"
                  value={encounterData.pulse}
                  onChange={onPatientChange}
                  label="Pulse"
                />
              </div>
              <div className="errors">{errors.pulse}</div>
              <div>
                <FormItem
                  type="text"
                  id="systolic"
                  value={encounterData.systolic}
                  onChange={onPatientChange}
                  label="Systolic"
                />
              </div>
              <div className="errors">{errors.systolic}</div>
              <div>
                <FormItem
                  type="text"
                  id="diastolic"
                  value={encounterData.diastolic}
                  onChange={onPatientChange}
                  label="Diastolic"
                />
              </div>
              <div className="errors">{errors.diastolic}</div>
              <div>
                <FormItem
                  type="text"
                  id="date"
                  value={encounterData.date.substring(0, 10)}
                  onChange={onPatientChange}
                  label="Date"
                />
                <div className="errors">{errors.date}</div>
              </div>
              <button type="submit" onClick={() => handleSubmitEdit()}>
                Update encounter
              </button>
            </div>
          </>
        )}
        {!edit && (
          <>
            <div>
              <button type="button" onClick={() => setEdit(true)}>
                Edit encounter
              </button>
            </div>
            <div>
              <p>
                Id:
                {encounterData.id}
              </p>
              <p>
                Notes:
                {encounterData.notes}
              </p>
              <p>
                VisitCode:
                {encounterData.visitCode}
              </p>
              <p>
                Provider:
                {encounterData.provider}
              </p>
              <p>
                Billing Code:
                {encounterData.billingCode}
              </p>
              <p>
                Icd10:
                {encounterData.icd10}
              </p>
              <p>
                Total Cost
                {encounterData.totalCost}
              </p>

              <p>
                Copay:
                {encounterData.copay}
              </p>
              <p>
                Chief Complaint:
                {encounterData.chiefComplaint}
              </p>
              <p>
                Pulse:
                {encounterData.pulse}
              </p>
              <p>
                Systolic pressure:
                {encounterData.systolic}
              </p>
              <p>
                Diastolic pressure:
                {encounterData.diastolic}
              </p>
              <p>
                Date:
                {encounterData.date}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EncounterDetailsPage;
