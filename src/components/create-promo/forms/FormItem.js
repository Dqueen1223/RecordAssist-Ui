import React from 'react';
import styles from '../PromoForm.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItem = ({
  onChange, value, id, label, placeholder, type, error, className
}) => (
  <div className={className}>
    <label className={styles.promoLabel} htmlFor={id}>
      {label}
      <div>
        {!error && (
        <input
          className={styles.input}
          id={id}
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
