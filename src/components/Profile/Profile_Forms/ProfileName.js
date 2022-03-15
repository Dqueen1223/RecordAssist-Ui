import React from 'react';
import ProfileForm from './ProfileItem';

const ProfileName = ({
  onChange, isEditing, data, errors
}) => {
  let error = errors;
  if (error === undefined) {
    error = {};
  }
  return (
    <div className="userInfo">
      <ul className="headerName">Personal Info</ul>
      <ProfileForm
        placeholder="e.g. Al"
        type="text"
        id="firstName"
        label="First Name"
        onChange={onChange}
        value={data.firstName}
        error={error.firstName}
        editing={isEditing}
      />
      <ProfileForm
        placeholder="e.g. Yankovic"
        type="text"
        id="lastName"
        label="Last Name"
        onChange={onChange}
        value={data.lastName}
        error={error.lastName}
        editing={isEditing}
      />
      <ProfileForm
        placeholder="e.g. something@something.something"
        type="text"
        id="email"
        label="Email"
        onChange={onChange}
        value={data.email}
        error={error.email}
        editing={false}
      />
    </div>
  );
};
export default ProfileName;
