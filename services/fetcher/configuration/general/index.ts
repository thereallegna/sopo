import { PATH_CITY, PATH_COUNTRY, PATH_PROVINCE } from '@constants/routes';
import axios from 'axios';
import { TableOptionState } from '../../../../types/client/table';

const getCountry = async (option?: TableOptionState) => {
  let url = `${PATH_COUNTRY}?page_size=${
    option?.pagination.pageSize || ''
  }&current_page=${option?.pagination.pageIndex || ''}&search=${
    option?.search || ''
  }`;
  console.log(option?.grouping.length);
  if (option?.grouping && option.grouping.length > 0) {
    url = PATH_COUNTRY;
  }
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

const editCountry = async (country: CountryFormBody) => {
  try {
    const res = await axios.put(
      `${PATH_COUNTRY}/${country.country_code}`,
      country
    );
    return res.data;
  } catch (error) {
    console.error('Error editing country:', error);
    throw error;
  }
};

const getProvince = async (option?: TableOptionState) => {
  let url = `${PATH_PROVINCE}?page_size=${
    option?.pagination.pageSize || ''
  }&current_page=${option?.pagination.pageIndex || ''}&search=${
    option?.search || ''
  }`;
  if (option?.grouping && option.grouping.length > 0) {
    url = PATH_PROVINCE;
  }
  const res = await axios.get(url);
  return res;
};

const createProvince = async (body: ProvinceFormBody) => {
  try {
    const res = await axios.post(PATH_PROVINCE, body);
    return res.data;
  } catch (error) {
    console.error('Error creating city:', error);
    throw error;
  }
};

const editProvince = async (body: ProvinceFormBody) => {
  try {
    const res = await axios.put(`${PATH_COUNTRY}/${body.province_code}`, body);
    return res.data;
  } catch (error) {
    console.error('Error editing country:', error);
    throw error;
  }
};

const getCity = async (option?: TableOptionState) => {
  let url = `${PATH_CITY}?page_size=${
    option?.pagination.pageSize || ''
  }&current_page=${option?.pagination.pageIndex || ''}&search=${
    option?.search || ''
  }`;
  if (option?.grouping && option.grouping.length > 0) {
    url = PATH_CITY;
  }
  const res = await axios.get(url);
  return res;
};

const createCity = async (city: CityFormBody) => {
  try {
    const res = await axios.post(PATH_CITY, city);
    return res.data;
  } catch (error) {
    console.error('Error creating city:', error);
    throw error;
  }
};

const editCity = async (city: CityFormBody) => {
  try {
    const res = await axios.put(`${PATH_CITY}/${city.city_code}`, city);
    return res.data;
  } catch (error) {
    console.error('Error editing country:', error);
    throw error;
  }
};

export {
  getCountry,
  createCountry,
  editCountry,
  getCity,
  createCity,
  editCity,
  getProvince,
  createProvince,
  editProvince,
};
