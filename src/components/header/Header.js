import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import GoogleLogin, { GoogleLogout } from 'react-google-login';
import loginUser from './HeaderService';
import constants from '../../utils/constants';
import { useProfile } from '../Profile/ProfileContext';
import UpdateUserByActivity from './UpdateActivityService';

/**
 * @name Header
 * @description Displays the navigation header
 * @return component
 */
const Header = () => {
  const [user, setUser] = useState('');
  const [googleError, setGoogleError] = useState('');
  const [apiError, setApiError] = useState(false);

  const { dispatch } = useProfile();
  useEffect(() => {
    dispatch({
      type: 'login',
      userProfile: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
      }
    });
  }, [dispatch, user]);
  const history = useHistory();
  /**
   * @name handleGoogleLoginSuccess
   * @description Function to run if google login was successful
   * @param {Object} response Response object from google
   */
  const handleGoogleLoginSuccess = (response) => {
    sessionStorage.setItem('token', response.getAuthResponse().id_token);
    const googleUser = {
      id: response.profileObj.id,
      email: response.profileObj.email,
      firstName: response.profileObj.givenName,
      lastName: response.profileObj.familyName
    };
    UpdateUserByActivity(googleUser.email);
    loginUser(googleUser, setUser, setApiError);
    setGoogleError('');
  };

  /**
   * @name handleGoogleLoginFailure
   * @description Function to run if google login was unsuccessful
   */
  const handleGoogleLoginFailure = () => {
    setGoogleError(
      'There was a problem logging in with Google. Please wait and try again later.'
    );
  };

  /**
   * @name handleGoogleLogoutSuccess
   * @description Function to run if google logout was successful
   */
  const handleGoogleLogoutSuccess = () => {
    setUser('');
    setGoogleError('');
    history.push('/logoutpage');
  };

  /**
   * @name handleGoogleLogoutFailure
   * @description Function to run if google logout was unsuccessful
   */
  const handleGoogleLogoutFailure = () => {
    setGoogleError(
      'There was a problem logging out with Google. Please wait and try again later.'
    );
  };

  // const renderProfileicon = () => (
  //   <Link to="/profilepage">
  //     <FaUserCircle className="profileicon" alt="profileIcon" />
  //   </Link>
  // );
  return (
    <div className="header">
      <header>Hotel Bookings</header>
      <Link to="/room-types">
        <p>Room Types</p>
      </Link>
      <Link to="/reservations">
        <p>Reservations</p>
      </Link>
      <div className="googlebutton">
        {user && <span>{user.firstName}</span>}
        {user && <span> </span>}
        {user && <span>{user.lastName}</span>}
        {googleError && <span>{googleError}</span>}
        {apiError && <span>Api Error</span>}
        {!user ? (
          <GoogleLogin
            clientId={constants.GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={handleGoogleLoginSuccess}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy="single_host_origin"
          />
        ) : (
          <GoogleLogout
            clientId={constants.GOOGLE_CLIENT_ID}
            buttonText="Logout"
            onLogoutSuccess={handleGoogleLogoutSuccess}
            onFailure={handleGoogleLogoutFailure}
          />
        )}
      </div>
    </div>
  );
};
export default Header;
