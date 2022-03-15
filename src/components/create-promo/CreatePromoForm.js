import React from 'react';
import FormItem from './forms/FormItem';
import FormItemDropdown from './forms/FormItemDropdown';
import FormItemDateTime from './forms/FormItemDateTime';
import styles from './PromoForm.module.css';

const PromoForm = ({
  endChange, startChange, startDate, endDate, onClick, onChange, errors, promo
}) => {
  const typeOptions = ['%', '$'];
  return (
    <>
      <div className={styles.createPromo}>
        <FormItem
          id="code"
          label="Promo Code"
          className={styles.nameInput}
          onChange={onChange}
          value={promo.code}
          error={errors.code}
        />
        <div className={styles.discount}>
          <FormItemDropdown
            id="type"
            label="Type"
            options={typeOptions}
            className={styles.typeDropdown}
            onChange={onChange}
          />
          <FormItem
            id="discount"
            label="Amount"
            className={styles.valueInput}
            onChange={onChange}
            value={promo.discount}
            error={errors.discount}
          />
        </div>
        <div className={styles.promoDates}>
          <FormItemDateTime
            id="startDate"
            label="Start Date"
            className={styles.dateInput}
            maxDate={endDate}
            onChange={startChange}
            onClick={onChange}
            value={startDate}
            error={errors.date}
          />
          <FormItemDateTime
            id="endDate"
            label="End Date"
            className={styles.dateInput}
            minDate={new Date()}
            onChange={endChange}
            onClick={onChange}
            value={endDate}
          />
        </div>
        <button
          type="button"
          className={styles.submitButton}
          onClick={onClick}
        >
          Submit
        </button>
      </div>
    </>
  );
};

export default PromoForm;
