import HttpHelper from '../../utils/HttpHelper';

export default async function createPatient(
  patient, setApiError
) {
  let checkValid = 'invalid';
  await HttpHelper('patients', 'POST', {
    firstName: patient.firstName,
    lastName: patient.lastName,
    ssn: patient.ssn,
    email: patient.email,
    street: patient.street,
    city: patient.city,
    state: patient.state,
    postal: patient.postal,
    age: patient.age,
    height: patient.height,
    weight: patient.weight,
    insurance: patient.insurance,
    gender: patient.gender
  })
    .then((response) => {
      if (response.ok) {
        checkValid = 'valid';
        response.json();
      } else {
        throw new Error(response.statusText);
      }
    })
    .catch(() => {
      setApiError(true);
    });
  return checkValid;
}
