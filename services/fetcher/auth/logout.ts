import axios from 'axios';
import { PATH_AUTH_LOGOUT } from '@constants/routes';

export const logout = async () => {
  const res = await axios.get(PATH_AUTH_LOGOUT);
  return res;
};
