import { PATH_CITY, PATH_COUNTRY, PATH_PROVINCE } from '@constants/routes';
import axios from 'axios';

const getCountry = async (option?: FetcherOptions) => {
  let url = PATH_COUNTRY;
  if (!option?.all) {
    url = `${PATH_COUNTRY}?page_size=${
      option?.pagination.pageSize || ''
    }&current_page=${option?.pagination.pageIndex || ''}&search=${
      option?.search || ''
    }`;
  }
  const res = await axios.get(url);
  return res;
};

const createCountry = async (body: CountryFormBody) => {
  try {
    const res = await axios.post(PATH_COUNTRY, body);
    return res.data;
  } catch (error) {
    console.error('Error creating country:', error);
    throw error;
  }
};

const editCountry = async (body: CountryFormBody) => {
  try {
    const res = await axios.put(`${PATH_COUNTRY}/${body.country_code}`, body);
    return res.data;
  } catch (error) {
    console.error('Error editing country:', error);
    throw error;
  }
};

const getProvince = async (option?: FetcherOptions) => {
  let url = PATH_PROVINCE;
  if (!option?.all) {
    url = `${PATH_PROVINCE}?page_size=${
      option?.pagination.pageSize || ''
    }&current_page=${option?.pagination.pageIndex || ''}&search=${
      option?.search || ''
    }`;
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
    const res = await axios.put(`${PATH_PROVINCE}/${body.province_code}`, body);
    return res.data;
  } catch (error) {
    console.error('Error editing country:', error);
    throw error;
  }
};

const getCity = async (option?: FetcherOptions) => {
  let url = PATH_CITY;
  if (!option?.all) {
    url = `${PATH_CITY}?page_size=${
      option?.pagination.pageSize || ''
    }&current_page=${option?.pagination.pageIndex || ''}&search=${
      option?.search || ''
    }`;
  }
  const res = await axios.get(url);
  return res;
};

const createCity = async (body: CityFormBody) => {
  try {
    const res = await axios.post(PATH_CITY, body);
    return res.data;
  } catch (error) {
    console.error('Error creating city:', error);
    throw error;
  }
};

const editCity = async (body: CityFormBody) => {
  try {
    const res = await axios.put(`${PATH_CITY}/${body.city_code}`, body);
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
