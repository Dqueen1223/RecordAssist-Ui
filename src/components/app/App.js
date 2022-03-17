import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter, Route, Switch
} from 'react-router-dom';
import ReservationsPage from '../Reservations-page/ReservationsPage';
import CreateReservationPage from '../Reservations-page/createReservationPage';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import EditReservationPage from '../Reservations-page/editReservationPage';
import EditRoomTypesPage from '../room-types/editRoom-typesPage';
import RoomTypesPage from '../room-types/roomTypesPage';
import CreateRoomTypePage from '../room-types/createRoom-typesPage';
import NotFoundPage from '../notFound';

toast.configure();
/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <Header />
    <Switch>
      <Route exact path="/reservations" render={() => <ReservationsPage />} />
      <Route
        exact
        path="/room-types/create"
        render={() => <CreateRoomTypePage />}
      />
      <Route exact path="/room-types" render={() => <RoomTypesPage />} />
      <Route
        exact
        path="/reservations/create"
        render={() => <CreateReservationPage />}
      />
      <Route path="/reservations/edit/:id">
        <EditReservationPage />
      </Route>
      <Route path="/room-types/edit/:id">
        <EditRoomTypesPage />
      </Route>
      <Route path="*" render={NotFoundPage} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default App;
