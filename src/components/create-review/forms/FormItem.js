import React from 'react';
import styles from '../CreateReview.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItem = ({
  onChange, value, id, label, placeholder, type, error, className, titleLength
}) => {
  let titleCount = 0;
  if (titleLength > 0) {
    titleCount = titleLength;
  }
  return (
    <div className={className}>
      <label className={styles.label} htmlFor={id}>
        <div className={styles.labelContents}>
          {label}
          {(titleCount > 42 && titleCount <= 50) && (
            <div className={styles.count}>
              {`Remaining Characters: ${50 - titleCount}`}
            </div>
          )}
          {titleCount > 50 && (
            <div className={styles.countErrorTitle}>
              {`Character limit exeeded: ${titleCount} of 50 used`}
            </div>
          )}
        </div>
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
};

export default FormItem;
