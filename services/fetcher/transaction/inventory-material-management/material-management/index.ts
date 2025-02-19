import {
  PATH_DIRECT_PURCHASE_RECEIVE,
  PATH_DIRECT_SALES_DELIVERY,
  PATH_GET_ITEM,
} from '@constants/routes';
import axios from 'axios';
import { replaceSlashes } from '@utils/converter';
import { FetcherOptions } from '../../../../../types/client/fetcher';

const getDirectPurchaseReceive = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_DIRECT_PURCHASE_RECEIVE}`, {
      params: {
        page_size: !option?.all ? option?.pagination?.pageSize : undefined,
        current_page: !option?.all ? option?.pagination?.pageIndex : undefined,
        search: option?.search,
      },
    });

    return res;
  } catch (error) {
    console.error('Error getting direct purchase receive:', error);
    throw error;
  }
};

const createDirectPurchaseReceive = async (
  body: DirectPurchaseReceiveFormBody,
  params?: any
) => {
  try {
    const res = await axios.post(PATH_DIRECT_PURCHASE_RECEIVE, body, {
      params,
    });
    return res.data;
  } catch (error) {
    console.error('Error creating direct purchase receive:', error);
    throw error;
  }
};

const editDirectPurchaseReceive = async (
  body: DirectPurchaseReceiveFormBody,
  params?: any
) => {
  try {
    const res = await axios.put(
      `${PATH_DIRECT_PURCHASE_RECEIVE}/${body.document_number}`,
      body,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error editing direct purchase receive:', error);
    throw error;
  }
};

const getDirectSalesDelivery = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_DIRECT_SALES_DELIVERY}`, {
      params: {
        page_size: !option?.all ? option?.pagination?.pageSize : undefined,
        current_page: !option?.all ? option?.pagination?.pageIndex : undefined,
        search: option?.search,
      },
    });

    return res;
  } catch (error) {
    console.error('Error getting direct sales delivery:', error);
    throw error;
  }
};

const getItemDirectSalesDelivery = async (option?: FetcherOptions) => {
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
    console.error('Error fetching direct sales delivery:', error);
    throw error;
  }
};

const createDirectSalesDelivery = async (
  body: DirectSalesDeliveryFormBody,
  params?: any
) => {
  try {
    const res = await axios.post(PATH_DIRECT_SALES_DELIVERY, body, { params });
    return res.data;
  } catch (error) {
    console.error('Error creating direct sales delivery:', error);
    throw error;
  }
};

const editDirectSalesDelivery = async (
  body: DirectSalesDeliveryFormBody,
  params?: any
) => {
  try {
    const res = await axios.put(
      `${PATH_DIRECT_SALES_DELIVERY}/${replaceSlashes(body.document_number)}`,
      body,
      {
        params,
      }
    );
    return res.data;
  } catch (error) {
    console.error('Error editing direct sales delivery:', error);
    throw error;
  }
};

export {
  getDirectPurchaseReceive,
  createDirectPurchaseReceive,
  editDirectPurchaseReceive,
  getDirectSalesDelivery,
  getItemDirectSalesDelivery,
  createDirectSalesDelivery,
  editDirectSalesDelivery,
};
