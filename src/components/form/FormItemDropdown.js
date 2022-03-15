import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItemDropdown
 * @description Input field
 * @return component
 */
const FormItemDropdown = ({
  onChange, value, id, label, options, error
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        {!error && (
        <select
          className={styles.input}
          id={id}
          onChange={onChange}
          onBlur={onChange}
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
        {error && (
        <select
          className={styles.inputError}
          id={id}
          onChange={onChange}
          onBlur={onChange}
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
        {!error && (<p className={styles.paragraph} />)}
        {error && (
          <p className={styles.error_item}>
            {error}
          </p>
        )}
      </div>
    </label>
  </div>
);

export default FormItemDropdown;
