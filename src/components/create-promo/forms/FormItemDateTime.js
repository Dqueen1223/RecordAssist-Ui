import React from 'react';
import DateTimePicker from 'react-datetime-picker';
import styles from '../PromoForm.module.css';

/**
 * @name FormItem
 * @description Input field
 * @return component
 */
const FormItemDateTime = ({
  onChange, value, id, label, placeholder, type, className, error, minDate, maxDate
}) => (
  <div className={className}>
    <label className={styles.promoLabel} htmlFor={id}>
      {label}
      {!error && (
        <DateTimePicker
          minDate={minDate}
          maxDate={maxDate}
          calendarClassName={styles.calendar}
          className={styles.calendar}
          disableClock
          clearIcon={null}
          id={id}
          onChange={onChange}
          placeholder={placeholder}
          type={type}
          value={value}
        />
      )}
      {error && (
        <DateTimePicker
          minDate={minDate}
          maxDate={maxDate}
          calendarClassName={styles.calendar}
          className={styles.calendar}
          disableClock
          clearIcon={null}
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
    </label>
  </div>
);

export default FormItemDateTime;
