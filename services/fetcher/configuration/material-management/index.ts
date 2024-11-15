import { PATH_ITEMS_UOM, PATH_ITEMS_CATEGORY } from '@constants/routes';
import axios from 'axios';
import { TableOptionState } from '../../../../types/client/table';

const getUOM = async (option?: TableOptionState) => {
  let url = `${PATH_ITEMS_UOM}?page_size=${
    option?.pagination.pageSize || ''
  }&current_page=${option?.pagination.pageIndex || ''}&search=${
    option?.search || ''
  }`;
  console.log(option?.grouping.length);
  if (option?.grouping && option.grouping.length > 0) {
    url = PATH_ITEMS_UOM;
  }
  const res = await axios.get(url);
  return res;
};

const createUOM = async (country: UOMFormBody) => {
  try {
    const res = await axios.post(PATH_ITEMS_UOM, country);
    return res.data;
  } catch (error) {
    console.error('Error creating country:', error);
    throw error;
  }
};

const editUOM = async (country: UOMFormBody) => {
  try {
    const res = await axios.put(
      `${PATH_ITEMS_UOM}/${country.uom_code}`,
      country
    );
    return res.data;
  } catch (error) {
    console.error('Error editing country:', error);
    throw error;
  }
};

const getCategoryMM = async (option?: TableOptionState) => {
  let url = `${PATH_ITEMS_CATEGORY}?page_size=${
    option?.pagination.pageSize || ''
  }&current_page=${option?.pagination.pageIndex || ''}&search=${
    option?.search || ''
  }`;
  console.log(option?.grouping.length);
  if (option?.grouping && option.grouping.length > 0) {
    url = PATH_ITEMS_CATEGORY;
  }
  const res = await axios.get(url);
  return res;
};

const createCategoryMM = async (country: CategoryMMFormBody) => {
  try {
    const res = await axios.post(PATH_ITEMS_CATEGORY, country);
    return res.data;
  } catch (error) {
    console.error('Error creating country:', error);
    throw error;
  }
};

const editCategoryMM = async (country: CategoryMMFormBody) => {
  try {
    const res = await axios.put(
      `${PATH_ITEMS_CATEGORY}/${country.category_code}`,
      country
    );
    return res.data;
  } catch (error) {
    console.error('Error editing country:', error);
    throw error;
  }
};

export {
  getUOM,
  createUOM,
  editUOM,
  getCategoryMM,
  createCategoryMM,
  editCategoryMM,
};
