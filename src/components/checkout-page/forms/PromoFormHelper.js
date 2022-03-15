import styles from '../ReviewOrderWidget.module.css';

const decideClassName = (error, success) => {
  if (error) {
    return styles.inputError;
  }
  if (success) {
    return styles.success;
  }
  return styles.input;
};
export default decideClassName;
