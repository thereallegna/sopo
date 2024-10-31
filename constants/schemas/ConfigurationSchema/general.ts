import * as Yup from 'yup';

export const countrySchema = Yup.object().shape({
  country_code: Yup.string().required('Country code is required'), // Corrected typo here
  country_name: Yup.string().required('Country name is required'),
});
