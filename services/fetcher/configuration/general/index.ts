import { PATH_COUNTRY } from '@constants/routes';
import axios from 'axios';
import { TableOptionState } from '../../../../types/client/table';

const getCountry = async (option: TableOptionState) => {
  const url = `${PATH_COUNTRY}?page_size=${
    option?.pagination.pageSize || ''
  }&current_page=${option?.pagination.pageIndex || ''}&search=${
    option.search || ''
  }`;
  const res = await axios.get(url);
  return res;
};

const createCountry = async (country: CountryFormBody) => {
  try {
    const res = await axios.post(PATH_COUNTRY, country);
    return res.data;
  } catch (error) {
    console.error('Error creating country:', error);
    throw error;
  }
};

export { getCountry, createCountry };
