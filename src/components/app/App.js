import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter, Route, Switch
} from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import ReservationsPage from '../Reservations-page/ReservationsPage';
import CreateReservationPage from '../Reservations-page/createReservationPage';
import ProfilePage from '../Profile/Profilepage';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import LogoutPage from '../Profile/Logoutpage';
import CreateProduct from '../create-product/CreateProduct';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import EditReservationPage from '../Reservations-page/editReservationPage';
import EditRoomTypesPage from '../room-types/editRoom-typesPage';
import RoomTypesPage from '../room-types/roomTypesPage';
import CreateRoomTypePage from '../room-types/createRoom-typesPage';

toast.configure();
/**
 * @name App
 * @returns component
 */
const App = () => (
  <BrowserRouter>
    <Header />
    <div className="headerContainer">
      <ToastContainer
        autoClose={8000}
        position={toast.POSITION.TOP_CENTER}
        pauseOnHover={false}
      />
    </div>
    <Switch>
      <Route exact path="/" render={() => <ProductPage />} />
      <Route exact path="/reservations" render={() => <ReservationsPage />} />
      <Route exact path="/room-types/create" render={() => <CreateRoomTypePage />} />
      <Route exact path="/room-types" render={() => <RoomTypesPage />} />
      <Route exact path="/reservations/create" render={() => <CreateReservationPage />} />
      <Route path="/reservations/edit/:id">
        <EditReservationPage />
      </Route>
      <Route path="/room-types/edit/:id">
        <EditRoomTypesPage />
      </Route>
      <Route exact path="/confirmation" render={() => <ConfirmationPage />} />
      <Route exact path="/profilepage" render={() => <ProfilePage />} />
      <Route
        exact
        path="/maintenance/create"
        render={() => <CreateProduct />}
      />
      <Route exact path="/logoutpage" render={() => <LogoutPage />} />
      <Route
        exact
        path="/maintenance/create"
        render={() => <CreateProduct />}
      />
      <Route exact path="/maintenance" render={() => <MaintenancePage />} />
    </Switch>
    <Footer />
  </BrowserRouter>
);

export default App;
