import React from 'react';
import styles from './FormItem.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItemTextArea = ({
  onChange, value, id, label, placeholder, type, error
}) => (

  <div>
    <label className={styles.label} htmlFor={id}>
      {label}
      <div>
        {!error && (
          <textarea
            className={styles.inputTextArea}
            id={id}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            value={value}
          />
        )}
        {error && (
          <textarea
            className={styles.inputErrorTA}
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

export default FormItemTextArea;
