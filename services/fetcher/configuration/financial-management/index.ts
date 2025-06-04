import { PATH_CURRENCY, PATH_TAX_GROUP, PATH_TAX } from '@constants/routes';
import axios from 'axios';
import { FetcherOptions } from '../../../../types/client/fetcher';

const getCurrency = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_CURRENCY}`, {
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

const createCurrency = async (body: CurrencyFormBody) => {
  try {
    const res = await axios.post(PATH_CURRENCY, body);
    return res.data;
  } catch (error) {
    console.error('Error creating Currency:', error);
    throw error;
  }
};

const editCurrency = async (body: CurrencyFormBody) => {
  try {
    const res = await axios.put(`${PATH_CURRENCY}/${body.currency_code}`, body);
    return res.data;
  } catch (error) {
    console.error('Error editing Currency:', error);
    throw error;
  }
};

const getTaxGroup = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_TAX_GROUP}`, {
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

const createTaxGroup = async (body: TaxGroupFormBody) => {
  try {
    const res = await axios.post(PATH_TAX_GROUP, body);
    return res.data;
  } catch (error) {
    console.error('Error creating Tax Group:', error);
    throw error;
  }
};

const editTaxGroup = async (body: TaxGroupFormBody) => {
  try {
    const res = await axios.put(
      `${PATH_TAX_GROUP}/${body.tax_group_code}`,
      body
    );
    return res.data;
  } catch (error) {
    console.error('Error editing Tax Group:', error);
    throw error;
  }
};

const getTax = async (option?: FetcherOptions) => {
  try {
    const res = await axios.get(`${PATH_TAX}`, {
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

const createTax = async (body: TaxFormBody) => {
  try {
    const res = await axios.post(PATH_TAX, body);
    return res.data;
  } catch (error) {
    console.error('Error creating Tax:', error);
    throw error;
  }
};

const editTax = async (body: TaxFormBody) => {
  try {
    const res = await axios.put(`${PATH_TAX}/${body.tax_code}`, body);
    return res.data;
  } catch (error) {
    console.error('Error editing Tax:', error);
    throw error;
  }
};

export {
  getCurrency,
  createCurrency,
  editCurrency,
  getTaxGroup,
  createTaxGroup,
  editTaxGroup,
  getTax,
  createTax,
  editTax,
};
