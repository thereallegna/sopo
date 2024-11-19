import { PATH_LOG_HISTORY } from '@constants/routes';
import axios from 'axios';

export const getLogHistory = async (option?: TimelineQuery) => {
  try {
    const res = await axios.get(`${PATH_LOG_HISTORY}`, {
      params: {
        code: option?.code,
        category: option?.category,
      },
    });

    console.log('Log history:', res.data);

    return res.data;
  } catch (error) {
    console.error('Error fetching log history:', error);
    throw error;
  }
};
