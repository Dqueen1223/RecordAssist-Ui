import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItem = ({
  onChange, value, id, label, placeholder, type, error
}) => (
  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        {!error && (
        <input
          className={styles.input}
          id={id}
          // onBlur={handleErrors}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
        )}
        {error && (
          <input
            className={styles.inputError}
            id={id}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            value={value}
          />
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

export default FormItem;
