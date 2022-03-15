import React from 'react';
import '../ProfilePage.css';

const ProfileFormDropdown = ({
  onChange, value, id, label, placeholder, type, error, editing, options
}) => (
  <div>
    <li>
      {label}
      :
      {!editing && value && (
        ` ${value}`
      )}
      {editing && (
        <select
          className={error ? 'inputError' : 'input'}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        >
          {options.map((optionText) => (
            <option
              value={optionText}
              key={optionText}
            >
              {optionText}
            </option>
          ))}
        </select>
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

export default ProfileFormDropdown;
