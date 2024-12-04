import { PATH_CURRENCY } from '@constants/routes';
import axios from 'axios';
import { FetcherOptions } from '../../../../types/client/fetcher';

const getCurrency = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_CURRENCY}`, {
      params: {
        page_size: !option?.all ? option?.pagination?.pageSize : undefined,
        current_page: !option?.all ? option?.pagination?.pageIndex : undefined,
        search: option?.search,
      },
    });

    return res;
  } catch (error) {
    console.error('Error fetching log history:', error);
    throw error;
  }
};

const createCurrency = async (body: CurrencyFormBody) => {
  try {
    const res = await axios.post(PATH_CURRENCY, body);
    return res.data;
  } catch (error) {
    console.error('Error creating Currency:', error);
    throw error;
  }
};

const editCurrency = async (body: CurrencyFormBody) => {
  try {
    const res = await axios.put(`${PATH_CURRENCY}/${body.currency_code}`, body);
    return res.data;
  } catch (error) {
    console.error('Error editing Currency:', error);
    throw error;
  }
};

export { getCurrency, createCurrency, editCurrency };
