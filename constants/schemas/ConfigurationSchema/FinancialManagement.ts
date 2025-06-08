import * as Yup from 'yup';

export const currencySchema = Yup.object().shape({
  currency_code: Yup.string().required('Currency code is required'), // Corrected typo here
  currency_name: Yup.string().required('Currency name is required'),
});

export const taxGroupSchema = Yup.object().shape({
  tax_group_code: Yup.string().required('Tax group code is required'),
  tax_group_name: Yup.string().required('Tax group name is required'),
});

export const taxSchema = Yup.object().shape({
  tax_code: Yup.string().required('Tax code is required'),
  tax_name: Yup.string().required('Tax name is required'),
  tax_rate: Yup.number().required('Tax rate is required'),
  tax_group: Yup.string().required('Tax group is required'),
  tax_group_code: Yup.string().required('Tax group is required'),
});
