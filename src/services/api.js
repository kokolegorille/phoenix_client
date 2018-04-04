import axios from 'axios';

import AuthService from '../services/auth_service';
import { ROOT_URL } from '../config/config';

const authHeaders = () => ({
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${AuthService.loadToken()}`,
  },
  credentials: 'same-origin',
});

const Api = {
  signin: params => axios.post(`${ROOT_URL}/authentication`, { session: params }),
  signup: params => axios.post(`${ROOT_URL}/registrations`, { user: params }),
  refreshToken: token => (
    axios.patch(
      `${ROOT_URL}/authentication/refresh`,
      { session: { token } },
      authHeaders(),
    )
  ),
  signout: () => axios.delete(`${ROOT_URL}/authentication`, authHeaders()),
};

export default Api;