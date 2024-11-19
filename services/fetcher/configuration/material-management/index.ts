import { PATH_ITEMS_UOM, PATH_ITEMS_CATEGORY } from '@constants/routes';
import axios from 'axios';
// import { TableOptionState } from '../../../../types/client/table';

const getUOM = async (option?: FetcherOptions) => {
  let url = PATH_ITEMS_UOM;
  if (option && !option.all) {
    // Menggunakan URLSearchParams untuk membangun query string
    const params = new URLSearchParams();

    // Menambahkan parameter dengan kondisi jika ada nilainya
    if (option.pagination) {
      params.append('page_size', option.pagination.pageSize?.toString() || '');
      params.append(
        'current_page',
        option.pagination.pageIndex?.toString() || ''
      );
    }

    if (option.search) {
      params.append('search', option.search);
    }

    // Menyusun URL lengkap dengan parameter
    url = `${PATH_ITEMS_UOM}?${params.toString()}`;
  }

  const res = await axios.get(url);
  return res;
};

const createUOM = async (body: UOMFormBody) => {
  try {
    const res = await axios.post(PATH_ITEMS_UOM, body);
    return res.data;
  } catch (error) {
    console.error('Error creating country:', error);
    throw error;
  }
};

const editUOM = async (body: UOMFormBody) => {
  try {
    const res = await axios.put(`${PATH_ITEMS_UOM}/${body.uom_code}`, body);
    return res.data;
  } catch (error) {
    console.error('Error editing country:', error);
    throw error;
  }
};

const getCategoryMM = async (option?: FetcherOptions) => {
  // let url = `${PATH_ITEMS_CATEGORY}?page_size=${
  //   option?.pagination.pageSize || ''
  // }&current_page=${option?.pagination.pageIndex || ''}&search=${
  //   option?.search || ''
  // }`;
  // console.log(option?.grouping.length);
  // if (option?.grouping && option.grouping.length > 0) {
  //   url = PATH_ITEMS_CATEGORY;
  // }
  // const res = await axios.get(url);
  // return res;
  let url = PATH_ITEMS_CATEGORY;
  if (option && !option.all) {
    // Menggunakan URLSearchParams untuk membangun query string
    const params = new URLSearchParams();

    // Menambahkan parameter dengan kondisi jika ada nilainya
    if (option.pagination) {
      params.append('page_size', option.pagination.pageSize?.toString() || '');
      params.append(
        'current_page',
        option.pagination.pageIndex?.toString() || ''
      );
    }

    if (option.search) {
      params.append('search', option.search);
    }

    // Menyusun URL lengkap dengan parameter
    url = `${PATH_ITEMS_CATEGORY}?${params.toString()}`;
  }

  const res = await axios.get(url);
  return res;
};

const createCategoryMM = async (body: CategoryMMFormBody) => {
  try {
    const res = await axios.post(PATH_ITEMS_CATEGORY, body);
    return res.data;
  } catch (error) {
    console.error('Error creating country:', error);
    throw error;
  }
};

const editCategoryMM = async (body: CategoryMMFormBody) => {
  try {
    const res = await axios.put(
      `${PATH_ITEMS_CATEGORY}/${body.categoryMM_code}`,
      body
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
