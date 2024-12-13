import { PATH_STOCK_SUMMARY, PATH_STOCK_MOVEMENT } from '@constants/routes';
import axios from 'axios';
import { FetcherOptions } from '../../../../types/client/fetcher';

const getStockSummary = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_STOCK_SUMMARY}`, {
      params: {
        page_size: !option?.all ? option?.pagination?.pageSize : undefined,
        current_page: !option?.all ? option?.pagination?.pageSize : undefined,
        search: option?.search,
      },
    });

    return res;
  } catch (error) {
    console.error('Error creating stock summary:', error);
    throw error;
  }
};

const createStockSummary = async (body: InitialStockFormBody, params?: any) => {
  // disesuaikan bodynya
  try {
    const res = await axios.post(PATH_STOCK_SUMMARY, body, { params });
    return res.data;
  } catch (error) {
    console.error('Error creating stock summary:', error);
    throw error;
  }
};

const editStockSummary = async (body: InitialStockFormBody, params?: any) => {
  // disesuaikan bodynya
  try {
    const res = await axios.put(
      `${PATH_STOCK_SUMMARY}/${body.document_number}`, // disesuaikan bodynya
      body,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error editing stock summary:', error);
    throw error;
  }
};

const getStockMovement = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_STOCK_MOVEMENT}`, {
      params: {
        page_size: !option?.all ? option?.pagination?.pageSize : undefined,
        current_page: !option?.all ? option?.pagination?.pageIndex : undefined,
        search: option?.search,
      },
    });

    return res;
  } catch (error) {
    console.error('Error creating stock movement:', error);
    throw error;
  }
};

const createStockMovement = async (
  body: InitialStockFormBody,
  params?: any
) => {
  // disesuaikan bodynya
  try {
    const res = await axios.post(PATH_STOCK_MOVEMENT, body, { params });
    return res.data;
  } catch (error) {
    console.error('Error creating stock movement:', error);
    throw error;
  }
};

const editStockMovement = async (body: InitialStockFormBody, params?: any) => {
  // disesuaikan bodynya
  try {
    const res = await axios.put(
      `${PATH_STOCK_MOVEMENT}/${body.document_number}`, // disesuaikan bodynya
      body,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error editing stock movement:', error);
    throw error;
  }
};

export {
  getStockSummary,
  createStockSummary,
  editStockSummary,
  getStockMovement,
  createStockMovement,
  editStockMovement,
};
