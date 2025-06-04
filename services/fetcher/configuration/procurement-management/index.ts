import { PATH_VENDOR_CATEGORY, PATH_VENDOR } from '@constants/routes';
import axios from 'axios';
import { FetcherOptions } from '../../../../types/client/fetcher';

const getVendorCategory = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_VENDOR_CATEGORY}`, {
      params: {
        page_size: !option?.all ? option?.pagination?.pageSize : undefined,
        current_page: !option?.all ? option?.pagination?.pageIndex : undefined,
        search: option?.search,
      },
    });

    return res;
  } catch (error) {
    console.error('Error fetching vendor category:', error);
    throw error;
  }
};

const createVendorCategory = async (body: VendorCategoryFormBody) => {
  try {
    const res = await axios.post(PATH_VENDOR_CATEGORY, body);
    return res.data;
  } catch (error) {
    console.error('Error creating Vendor Category:', error);
    throw error;
  }
};

const editVendorCategory = async (body: VendorCategoryFormBody) => {
  try {
    const res = await axios.put(
      `${PATH_VENDOR_CATEGORY}/${body.vendor_category_code}`,
      body
    );
    return res.data;
  } catch (error) {
    console.error('Error editing Vendor Category:', error);
    throw error;
  }
};

const getVendor = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_VENDOR}`, {
      params: {
        page_size: !option?.all ? option?.pagination?.pageSize : undefined,
        current_page: !option?.all ? option?.pagination?.pageIndex : undefined,
        search: option?.search,
      },
    });

    return res;
  } catch (error) {
    console.error('Error fetching vendor:', error);
    throw error;
  }
};

const createVendor = async (body: VendorFormBody) => {
  try {
    const res = await axios.post(PATH_VENDOR, body);
    return res.data;
  } catch (error) {
    console.error('Error creating Vendor:', error);
    throw error;
  }
};

const editVendor = async (body: VendorFormBody) => {
  try {
    const res = await axios.put(`${PATH_VENDOR}/${body.vendor_code}`, body);
    return res.data;
  } catch (error) {
    console.error('Error editing Vendor:', error);
    throw error;
  }
};

export {
  getVendorCategory,
  createVendorCategory,
  editVendorCategory,
  getVendor,
  createVendor,
  editVendor,
};
