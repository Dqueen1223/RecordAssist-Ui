import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  BrowserRouter, Route, Switch
} from 'react-router-dom';
import ProductPage from '../product-page/ProductPage';
// import CheckoutPage from '../checkout-page/CheckoutPage';
import ConfirmationPage from '../confirmation-page/ConfirmationPage';
import Reservations from '../Reservations-page/ReservationsPage';
import CreateReservation from '../Reservations-page/create-reservation';
import ProfilePage from '../Profile/Profilepage';
import Footer from '../footer/Footer';
import Header from '../header/Header';
import LogoutPage from '../Profile/Logoutpage';
import CreateProduct from '../create-product/CreateProduct';
import MaintenancePage from '../maintenance-page/MaintenancePage';
import EditReservation from '../Reservations-page/editReservationPage';
import RoomTypes from '../room-types/roomTypesPage';
import CreateRoomType from '../room-types/createRoom-types';

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
      <Route exact path="/reservations" render={() => <Reservations />} />
      <Route exact path="/room-types/create" render={() => <CreateRoomType />} />
      <Route exact path="/room-types" render={() => <RoomTypes />} />
      <Route exact path="/reservations/create" render={() => <CreateReservation />} />
      {/* <Route path="/reservations/edit/:id" render={() => <EditReservation />} /> */}
      <Route path="/reservations/edit/:id">
        <EditReservation />
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
