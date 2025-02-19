import {
  PATH_INITIAL_STOCK,
  PATH_STOCK_ADJUSTMENT,
  PATH_STOCK_MUTATION,
  PATH_GET_ITEM,
} from '@constants/routes';
import axios from 'axios';
import { replaceSlashes } from '@utils/converter';
import { FetcherOptions } from '../../../../../types/client/fetcher';

const getInitialStock = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_INITIAL_STOCK}`, {
      params: {
        page_size: !option?.all ? option?.pagination?.pageSize : undefined,
        current_page: !option?.all ? option?.pagination?.pageIndex : undefined,
        search: option?.search,
      },
    });

    return res;
  } catch (error) {
    console.error('Error getting initial stock:', error);
    throw error;
  }
};

const createInitialStock = async (body: InitialStockFormBody, params?: any) => {
  try {
    const res = await axios.post(PATH_INITIAL_STOCK, body, { params });
    return res.data;
  } catch (error) {
    console.error('Error creating initial stock:', error);
    throw error;
  }
};

const editInitialStock = async (body: InitialStockFormBody, params?: any) => {
  try {
    const res = await axios.put(
      `${PATH_INITIAL_STOCK}/${replaceSlashes(body.document_number)}`,
      body,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error editing initial stock:', error);
    throw error;
  }
};

const getStockAdjustment = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_STOCK_ADJUSTMENT}`, {
      params: {
        page_size: !option?.all ? option?.pagination?.pageSize : undefined,
        current_page: !option?.all ? option?.pagination?.pageIndex : undefined,
        search: option?.search,
      },
    });

    return res;
  } catch (error) {
    console.error('Error fetching stock adjustment:', error);
    throw error;
  }
};

const getItemStockAdjustment = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_GET_ITEM}`, {
      params: {
        page_size: !option?.all ? option?.pagination?.pageSize : undefined,
        current_page: !option?.all ? option?.pagination?.pageIndex : undefined,
        search: option?.search,
        ...option?.query,
      },
    });

    return res;
  } catch (error) {
    console.error('Error fetching stock adjustment:', error);
    throw error;
  }
};

const createStockAdjustment = async (
  body: StockAdjustmentFormBody,
  params?: any
) => {
  try {
    const res = await axios.post(PATH_STOCK_ADJUSTMENT, body, { params });
    return res.data;
  } catch (error) {
    console.error('Error creating stock adjustment:', error);
    throw error;
  }
};

const editStockAdjustment = async (
  body: StockAdjustmentFormBody,
  params?: any
) => {
  try {
    const res = await axios.put(
      `${PATH_STOCK_ADJUSTMENT}/${body.document_number}`,
      body,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error editing stock adjustment:', error);
    throw error;
  }
};

const getStockMutation = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_STOCK_MUTATION}`, {
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

const createStockMutation = async (
  body: StockMutationFormBody,
  params?: any
) => {
  try {
    console.log('Cek Data => ', body);
    const res = await axios.post(PATH_STOCK_MUTATION, body, { params });
    return res.data;
  } catch (error) {
    console.error('Error creating item category:', error);
    throw error;
  }
};

const editStockMutation = async (body: StockMutationFormBody, params?: any) => {
  try {
    const res = await axios.put(
      `${PATH_STOCK_MUTATION}/${body.document}`,
      body,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error editing item category:', error);
    throw error;
  }
};

export {
  getInitialStock,
  createInitialStock,
  editInitialStock,
  getStockMutation,
  createStockMutation,
  editStockMutation,
  getStockAdjustment,
  createStockAdjustment,
  editStockAdjustment,
  getItemStockAdjustment,
};
