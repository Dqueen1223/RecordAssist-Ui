import React from 'react';
import styles from '../CreateReview.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItemTextArea = ({
  onChange, value, id, label, placeholder, type, className, reviewLength, error
}) => {
  let count = 0;
  if (reviewLength > 0) {
    count = reviewLength;
  }

  return (
    <div className={className}>
      <label className={styles.label} htmlFor={id}>
        <div className={styles.labelContents}>
          {label}
          {(count > 255 && count <= 300) && (
            <div className={styles.commentCount}>
              {`Remaining Characters: ${300 - count}`}
            </div>
          )}
          {count > 300 && (
            <div className={styles.countErrorComment}>
              {`Character limit exeeded: ${count} of 300 used`}
            </div>
          )}
        </div>
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
          {!error && (
            <p className={styles.paragraph} />
          )}
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

export default FormItemTextArea;
