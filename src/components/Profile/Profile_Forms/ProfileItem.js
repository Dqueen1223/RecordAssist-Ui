import React from 'react';
import '../ProfilePage.css';

const ProfileForm = ({
  onChange, value, id, label, placeholder, type, error, editing
}) => (
  <div className="listDiv">
    <li>
      {label}
      :
      {!editing && value && (
        ` ${value}`
      )}
      {editing && (
      <input
        className={error ? 'inputError' : 'input'}
        id={id}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      )}
      {error
        ? (
          <p className="error_item">
            {error}
          </p>
        )
        : (<p className="paragraph" />)}
      {label === 'Email' && editing && <p className="notification">Sorry, you can not edit your email</p>}
    </li>
  </div>
);

export default ProfileForm;
