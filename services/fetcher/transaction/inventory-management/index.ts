import { PATH_ITEMS_UOM } from '@constants/routes';
import axios from 'axios';
import { FetcherOptions } from '../../../../types/client/fetcher';

const getStockMutation = async (option?: FetcherOptions) => {
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

export { getStockMutation };
