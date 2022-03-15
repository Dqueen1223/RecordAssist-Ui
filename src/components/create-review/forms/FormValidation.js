import { toast } from 'react-toastify';
/**
 * @param {*} form //single form from document
 * @returns //error div to append to errors ul
 *
 * Validation for required input fields, test if input has any value
 */
const generateErrors = (form, idList) => {
  const noValue = [];
  const exceedMax300 = [];
  const exceedMax50 = [];
  const signIn = [];
  const errors = {};

  for (let i = 0; i < idList.length; i += 1) {
    const id = idList[i];
    const value = form[id];

    if (!value) {
      console.log(value);
      noValue.push(id);
    }
    if (value) {
      if (id === 'reviewsDescription' && (value.length > 300)) {
        console.log(value);
        exceedMax300.push(id);
      }
      if (id === 'title' && (value.length > 50)) {
        exceedMax50.push(id);
      }
    }
    if (id === 'email' && !value) {
      signIn.push(id);
    }
  }
  if (noValue.length) {
    noValue.forEach((i) => {
      errors[i] = 'Required';
    });
  }
  if (exceedMax300.length) {
    exceedMax300.forEach((i) => {
      errors[i] = ' ';
    });
  }
  if (exceedMax50.length) {
    exceedMax50.forEach((i) => {
      errors[i] = ' ';
    });
  }
  if (signIn.length) {
    signIn.forEach((i) => {
      errors[i] = 'Must Be signed In';
    });
    toast.error('Must be signed in to create a review');
  }

  return errors;
};

export default generateErrors;
