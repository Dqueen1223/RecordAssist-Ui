/**
 * @param {*} form //single form from document
 * @returns //error div to append to errors ul
 *
 * Validation for required input fields, test if input has any value
 */
const generateErrors = (form, idList) => {
  const noValue = [];
  const twoDecimal = [];
  const onlyAlphaNum = [];
  const onlyNum = [];
  const invalidRange = [];
  const noNegativeNumbers = [];
  const startEndSame = [];
  const expired = [];
  const errors = {};

  for (let i = 0; i < idList.length; i += 1) {
    const id = idList[i];
    const value = form[id];
    const alphaNum = /^[a-z0-9]+$/i;
    const numbers = /^[.0-9]+$/;

    if (!value && (id !== 'endDate')) {
      noValue.push(id);
    }
    if (value && (id === 'code' && !value.match(alphaNum))) {
      onlyAlphaNum.push(id);
    }
    if (value && (id === 'discount' && !value.match(numbers))) {
      onlyNum.push(id);
    }
    if (value && (form.type === '$' && id === 'discount')) {
      const cents = value.toString().split('.');
      if (cents.length > 2) {
        twoDecimal.push(id);
      }
      if (cents.length === 2 && cents[1].length !== 2) {
        twoDecimal.push(id);
      }
    }
    if (value && (value > 100 || value < 1) && (form.type === '%' && id === 'discount')) {
      invalidRange.push(id);
    }
    if (value && (value < 0) && (form.type === '$' && id === 'discount')) {
      noNegativeNumbers.push(id);
    }
    if (form.endDate === form.startDate && (id === 'startDate' || id === 'endDate')) {
      startEndSame.push(id);
    }
    if (form.endDate <= new Date().toISOString() && (id === 'endDate')) {
      expired.push(id);
    }
  }

  if (noValue.length) {
    noValue.forEach((i) => {
      errors[i] = 'Required';
    });
  }
  if (twoDecimal.length) {
    twoDecimal.forEach((i) => {
      errors[i] = 'Requires two decimals';
    });
  }
  if (onlyAlphaNum.length) {
    onlyAlphaNum.forEach((i) => {
      errors[i] = 'Must contain alphanumeric characters only';
    });
  }
  if (invalidRange.length) {
    invalidRange.forEach((i) => {
      errors[i] = 'Must be between 1-100%';
    });
  }
  if (onlyNum.length) {
    onlyNum.forEach((i) => {
      errors[i] = 'Must contain only numbers';
    });
  }
  if (noNegativeNumbers.length) {
    noNegativeNumbers.forEach((i) => {
      errors[i] = 'No Negative Amount';
    });
  }
  if (expired.length) {
    expired.forEach(() => {
      errors.date = 'Date is expired';
    });
  }
  if (startEndSame.length) {
    startEndSame.forEach(() => {
      errors.date = 'Start and end dates cannot be equal';
    });
  }
  return errors;
};

export default generateErrors;
