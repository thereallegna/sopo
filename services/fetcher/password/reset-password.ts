import axios from 'axios';
import { PATH_AUTH_RESET_PASSWORD } from '@constants/routes';

export const resetPassword = async (token: string, newPassword: string) => {
  try {
    const res = await axios.post(PATH_AUTH_RESET_PASSWORD, {
      token,
      newPassword,
    });
    return res;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};
