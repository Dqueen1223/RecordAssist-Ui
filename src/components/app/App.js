import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter, Route, Switch
} from 'react-router-dom';
import PatientsPage from '../PatientsPage/PatientsPage';
// import CreateReservationPage from '../PatientsPage/createReservationPage';
import Header from '../header/Header';
import PatientDetailsPage from '../PatientsPage/patientDetailsPage';
import EditRoomTypesPage from '../encounters/editRoom-typesPage';
import RoomTypesPage from '../encounters/roomTypesPage';
import CreateRoomTypePage from '../encounters/createRoom-typesPage';
import NotFoundPage from '../notFound';
import HomePage from '../Home/HomePage';
import CreatePatientPage from '../PatientsPage/createPatientPage';
import CreateEncountersPage from '../encounters/createEncountersPage';
import EncounterDetailsPage from '../encounters/encounterDetailsPage';

toast.configure();
/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/" render={() => <HomePage />} />
      <Route exact path="/patients" render={() => <PatientsPage />} />
      <Route
        exact
        path="/room-types/create"
        render={() => <CreateRoomTypePage />}
      />
      <Route exact path="/room-types" render={() => <RoomTypesPage />} />
      <Route
        exact
        path="/patients/create"
        render={() => <CreatePatientPage />}
      />
      <Route path="/patients/details/:id">
        <PatientDetailsPage />
      </Route>
      <Route path="/patients/encounters/details/:id">
        <EncounterDetailsPage />
      </Route>
      <Route path="/patients/encounters/create/:id">
        <CreateEncountersPage />
      </Route>
      <Route path="/room-types/edit/:id">
        <EditRoomTypesPage />
      </Route>
      <Route path="*" render={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
