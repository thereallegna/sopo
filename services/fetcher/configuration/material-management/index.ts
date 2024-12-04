import {
  PATH_ITEMS_UOM,
  PATH_ITEMS_CATEGORY,
  PATH_ITEMS_MASTER,
  PATH_WAREHOUSE,
} from '@constants/routes';
import axios from 'axios';
import { FetcherOptions } from '../../../../types/client/fetcher';

const getUOM = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_ITEMS_UOM}`, {
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

const getItemCategory = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_ITEMS_CATEGORY}`, {
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

const createItemCategory = async (body: ItemCategoryFormBody) => {
  try {
    const res = await axios.post(PATH_ITEMS_CATEGORY, body);
    console.log('abody', body);
    return res.data;
  } catch (error) {
    console.error('Error creating item category:', error);
    throw error;
  }
};

const editItemCategory = async (body: ItemCategoryFormBody) => {
  try {
    console.log(body);
    const res = await axios.put(
      `${PATH_ITEMS_CATEGORY}/${body.item_category_code}`,
      body
    );
    return res.data;
  } catch (error) {
    console.error('Error editing item category:', error);
    throw error;
  }
};

const getItem = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_ITEMS_MASTER}`, {
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

const createItem = async (body: MasterItemFormBody) => {
  try {
    const res = await axios.post(PATH_ITEMS_MASTER, body);
    return res.data;
  } catch (error) {
    console.error('Error creating item category:', error);
    throw error;
  }
};

const getWarehouse = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_WAREHOUSE}`, {
      params: {
        all: option?.all,
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

export {
  getUOM,
  createUOM,
  editUOM,
  getItemCategory,
  createItemCategory,
  editItemCategory,
  getItem,
  createItem,
  getWarehouse,
};
