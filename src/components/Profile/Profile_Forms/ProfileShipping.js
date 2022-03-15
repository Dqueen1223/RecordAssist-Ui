import React from 'react';
import ProfileForm from './ProfileItem';
import ProfileFormDropdown from './ProfileItemDropdown';

const ProfileShipping = ({
  onChange, data, isEditing, errors
}) => {
  let error = errors;
  const usStates = ['Select a state', 'Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];
  if (error === undefined) {
    error = {};
  }
  return (
    <div className="userInfo">
      <ul className="headerShipping">Shipping Address</ul>
      <ProfileForm
        placeholder="e.g. 123 Sesame Street"
        type="text"
        id="street"
        label="Street"
        onChange={onChange}
        value={data.street}
        error={error.street}
        editing={isEditing}
      />
      <ProfileForm
        placeholder="e.g. 123 Sesame Street"
        type="text"
        id="street2"
        label="Street2"
        onChange={onChange}
        value={data.street2}
        error={error.street2}
        editing={isEditing}
      />
      <ProfileForm
        placeholder="e.g. Boston"
        type="text"
        id="city"
        label="City"
        onChange={onChange}
        value={data.city}
        error={error.city}
        editing={isEditing}
      />
      <ProfileFormDropdown
        placeholder="e.g. Alabama"
        type="text"
        id="state"
        label="State"
        onChange={onChange}
        value={data.state}
        options={usStates}
        error={error.state}
        editing={isEditing}
      />
      <ProfileForm
        placeholder="e.g. 12345"
        type="text"
        id="zip"
        label="Zip"
        onChange={onChange}
        value={data.zip}
        error={error.zip}
        editing={isEditing}
      />
      <ProfileForm
        placeholder="e.g. 12345"
        type="text"
        id="phone"
        label="Phone"
        onChange={onChange}
        value={data.phone}
        error={error.phone}
        editing={isEditing}
      />
    </div>
  );
};

export default ProfileShipping;
