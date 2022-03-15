/* eslint-disable no-param-reassign */
const profileValidation = (data) => {
  const validateRequiredField = (object, field, errors) => {
    if (object[field] === null || object[field] === undefined) {
      errors[field] = 'This field is required';
    } else if (object[field].trim() === '') {
      errors[field] = 'This field is required';
    }
  };

  const validateAllFields = (information) => {
    const errors = {};
    if (data.state === 'Select a state') {
      errors.state = 'This field is required';
    }
    validateRequiredField(information, 'firstName', errors);
    validateRequiredField(information, 'lastName', errors);
    validateRequiredField(information, 'street', errors);
    validateRequiredField(information, 'city', errors);
    validateRequiredField(information, 'state', errors);
    validateRequiredField(information, 'zip', errors);
    validateRequiredField(information, 'phone', errors);
    return errors;
  };
  return validateAllFields(data);
};
export default profileValidation;
