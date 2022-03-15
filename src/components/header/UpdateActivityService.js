import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

const UpdateUserByActivity = async (user) => {
  await HttpHelper(`${Constants.USERS_ENDPOINT}/${user.id}`, 'PUT', {
    LastActive: new Date().toISOString(),
    id: user.id,
    dateModified: user.dateModified,
    email: user.email,
    role: user.role,
    firstName: user.firstName,
    lastName: user.lastName,
    street: user.street,
    street2: user.street2,
    city: user.city,
    state: user.state,
    zip: user.zip,
    phone: user.phone,
    wishlist: user.wishlist
  }).then((response) => {
    if (response.ok) {
      return response.json();
    }
    throw new Error(Constants.API_ERROR);
  });
};

const updateUserByEmail = async (email) => {
  let userByEmailExists;
  await HttpHelper(`/users/${email}`, 'GET')
    .then((response) => {
      if (response.status === 200) {
        userByEmailExists = true;
        return response.json();
      }
      if (response.status === 404) {
        userByEmailExists = false;
      }
      throw new Error(response.statusText);
    })
    .then((body) => {
      UpdateUserByActivity(body);
      document.cookie = `user=${JSON.stringify(body)}`;
    })
    .catch(() => {});

  return userByEmailExists;
};

export default updateUserByEmail;
