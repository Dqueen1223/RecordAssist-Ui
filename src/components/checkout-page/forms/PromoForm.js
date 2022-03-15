import React from 'react';
import CheckIcon from '@mui/icons-material/Check';
import styles from '../ReviewOrderWidget.module.css';
import decideClassName from './PromoFormHelper';

const PromoItem = ({
  onChange, onBlur, value, id, label, placeholder, type, error, success
}) => (
  <div className={styles.wrapperDiv}>
    <div className={styles.orderDiv}>
      <div className={styles.label}>
        {label}
      </div>
      <input
        className={decideClassName(error, success)}
        id={id}
        onBlur={onBlur}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {success && (<CheckIcon className={styles.check} style={{ color: 'green' }} />)}
    </div>
    {error && (
    <p className={styles.error_item}>
        {error}
    </p>
    )}
    { !error && (<p className={styles.paragraph} />) }
  </div>
);

export default PromoItem;
