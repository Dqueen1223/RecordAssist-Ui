import { toast } from 'react-toastify';
import HttpHelper from '../../utils/HttpHelper';
import Constants from '../../utils/constants';

export default async function fetchUpdateUser(profile, setProfile) {
  // eslint-disable-next-line prefer-template
  await HttpHelper(Constants.USERS_ENDPOINT + '/' + profile.id, 'PUT', profile)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(Constants.API_ERROR);
    })
    .then(setProfile)
    .catch(() => {
      /* eslint-disable no-console */
      toast.error('Unable to connect to database');
      /* eslint-enable no-console */
    });
}
