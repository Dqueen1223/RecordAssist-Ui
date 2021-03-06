import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaPencilAlt, FaBan } from 'react-icons/fa';
import FormItem from '../form/FormItem';
import EncounterFormValidator from './encounterFormValidator';
import Constants from '../../utils/constants';
import '../PatientsPage/Reservations.modules.css';
import fetchEncountersByPatientId from '../PatientsPage/encountersByIdService';
import updateEncounter from './encounterUpdateService';
import EncounterDetails from '../form/Formdetails';

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
  const cancelEdit = () => {
    setEdit(false);
    fetchEncountersByPatientId(
      setEncounterData,
      id,
      setApiError,
      setNotFoundError
    );
  };
  const handleSubmitEdit = async () => {
    if (Object.keys(EncounterFormValidator(encounterData)).length === 0) {
      if (await updateEncounter(encounterData, id, setApiError) === 'valid') {
        toast.success(`Encounter with id:${encounterData.id} Has Been Added`);
        cancelEdit();
      }
    } else {
      toast.error('There are invalid fields, please enter valid info');
    }
    setErrors(EncounterFormValidator(encounterData));
  };
  const onPatientChange = (e) => {
    setEncounterData({ ...encounterData, [e.target.id]: e.target.value });
  };
  if (encounterData.date) {
    encounterData.date = encounterData.date.substring(0, 10);
  }
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
              <button type="button" id="editEncounterButton" onClick={() => cancelEdit()}>
                <FaBan size={70} title="Cancel Edit" id="editEncounter" />
              </button>
            </div>
            <div>
              <h3>Edit Encounter</h3>
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
                  type="text"
                  id="visitCode"
                  value={encounterData.visitCode}
                  onChange={onPatientChange}
                  label="visit Code"
                />
              </div>
              <div className="errors">{errors.visitCode}</div>
              <div>
                <FormItem
                  type="text"
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
                  value={encounterData.date}
                  onChange={onPatientChange}
                  label="Date"
                />
                <div className="errors">{errors.date}</div>
              </div>
              <button type="submit" className="submit" onClick={() => handleSubmitEdit()}>
                Update encounter
              </button>
            </div>
          </>
        )}
        {!edit && (
          <>
            <div className="pageHeader">
              <button type="button" id="editEncounterButton" onClick={() => setEdit(true)}>
                <FaPencilAlt size={70} title="Edit Encounter" id="editEncounter" />
              </button>
              <div>
                <h3 id="encounterInfo">Encounter info</h3>
              </div>
            </div>
            <div>
              <EncounterDetails encounterData={encounterData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EncounterDetailsPage;
