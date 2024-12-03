import * as Yup from 'yup';

export const currencySchema = Yup.object().shape({
  currency_code: Yup.string().required('Currency code is required'), // Corrected typo here
  currency_name: Yup.string().required('Currency name is required'),
});
