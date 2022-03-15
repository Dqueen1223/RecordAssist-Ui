import React, { useState, useEffect } from 'react';
import './ProfilePage.css';
import { toast } from 'react-toastify';
import SettingsIcon from '@mui/icons-material/Settings';
import CheckIcon from '@mui/icons-material/Check';
import { IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { useProfile } from './ProfileContext';
import ProfilePurchase from './ProfilePurchase';
import loginUser from '../header/HeaderService';
import fetchPurchases from './ProfilePageService';
import ProfileName from './Profile_Forms/ProfileName';
import ProfileShipping from './Profile_Forms/ProfileShipping';
import profileValidation from './Validation';
import fetchUpdateUser from './ProfileUpdateService';

const ProfilePage = () => {
  const {
    state: { userProfile }
  } = useProfile();

  const [profile, setProfile] = useState({});

  // const [apiError, setApiError] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [purchaseInfo, setPurchaseInfo] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [tempProfile, setTempProfile] = useState(null);
  const [errors, setErrors] = useState({});

  const onProfileChange = (e) => {
    setProfile({ ...profile, [e.target.id]: e.target.value });
  };

  const [apiError, setApiError] = useState('');
  useEffect(() => {
    loginUser(userProfile[1], setProfile, setApiError);
  }, [userProfile]);

  useEffect(() => {
    fetchPurchases(`?email=${profile.email}`, setPurchases);
  }, [profile.email]);

  const startEditing = () => {
    if (isEditing === false) {
      setIsEditing(true);
      setTempProfile(profile);
    } else {
      const transfer = tempProfile;
      setProfile(transfer);
      setIsEditing(false);
      setErrors({});
    }
  };
  const trySubmit = () => {
    const currentErrors = profileValidation(profile);
    if (Object.keys(currentErrors).length > 0) {
      setErrors(currentErrors);
      toast.error('There was errors in the inputs. The changes have not been submitted');
    } else {
      const user = {
        id: profile.id,
        dateModified: new Date().toISOString(),
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        street: profile.street,
        street2: profile.street2,
        city: profile.city,
        state: profile.state,
        zip: profile.zip,
        phone: profile.phone,
        role: profile.role,
        wishlist: profile.wishlist,
        dateCreated: profile.dateCreated
      };
      fetchUpdateUser(user, setProfile);
      setIsEditing(false);
      setErrors(currentErrors);
    }
  };
  /* const renderPurchase = () => {
    <div className="test">
      {console.log(purchases)}
            {userProfile[0].email}
    </div>;
  }; */
  const changeStatePurchase = () => {
    if (purchases.length !== 0) {
      setPurchaseInfo(true);
      document.getElementById('purchase').classList.add('active');
      document.getElementById('profile').classList.remove('active');
    } else {
      toast.error('You have no purchases to view.');
    }
  };
  const changeStateProfileInfo = () => {
    setPurchaseInfo(false);
    document.getElementById('profile').classList.add('active');
    document.getElementById('purchase').classList.remove('active');
  };
  if (!apiError) {
    try {
      return (
        <div className="profile">
          <div className="ui">
            <div className="buttons">
              <button className="profileButton active" id="profile" type="button" onClick={changeStateProfileInfo}> User Info</button>
              <button className="profileButton purchaseHistory" id="purchase" type="button" onClick={changeStatePurchase}> Purchase History </button>
            </div>
          </div>
          <div className="content">
            {!purchaseInfo && (
              <div className="userInfodiv">
                <IconButton className="edit" size="large" onClick={startEditing}><SettingsIcon /></IconButton>
                <ProfileName
                  onChange={onProfileChange}
                  isEditing={isEditing}
                  data={profile}
                  errors={errors}
                />
                <ProfileShipping
                  onChange={onProfileChange}
                  isEditing={isEditing}
                  data={profile}
                  errors={errors}
                />
                  {isEditing && <Button className="submit" size="large" startIcon={<CheckIcon />} onClick={trySubmit} />}
              </div>
            )}
            {purchaseInfo && (
              <div className="purchases">
                {purchases.map((purchase) => (
                  <div key={purchase.id} className="purchase">
                    <ProfilePurchase
                      purchases={purchase}
                    />
                  </div>
                ))}
              </div>
            )}
            <div className="stopOverflow" />
          </div>
        </div>
      );
    } catch {
      return (
        <div>
          <p>You must be logged in to view the profile page</p>
        </div>
      );
    }
  }
  return (
    <div>
      <p> There was a problem logging into your profile</p>
    </div>
  );
};
export default ProfilePage;
