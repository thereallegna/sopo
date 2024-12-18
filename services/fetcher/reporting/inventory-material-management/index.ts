import { PATH_STOCK_SUMMARY, PATH_STOCK_MOVEMENT } from '@constants/routes';
import axios from 'axios';
import { FetcherOptions } from '../../../../types/client/fetcher';

const getStockSummary = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_STOCK_SUMMARY}`, {
      params: {
        page_size: !option?.all ? option?.pagination?.pageSize : undefined,
        current_page: !option?.all ? option?.pagination?.pageIndex : undefined,
        search: option?.search,
        ...option?.query,
      },
    });

    return res;
  } catch (error) {
    console.error('Error getting stock summary:', error);
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
        ...option?.query,
      },
    });

    return res;
  } catch (error) {
    console.error('Error creating stock movement:', error);
    throw error;
  }
};

export { getStockSummary, getStockMovement };
