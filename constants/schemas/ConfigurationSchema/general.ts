import * as Yup from 'yup';

export const countrySchema = Yup.object().shape({
  country_code: Yup.string().required('Country code is required'), // Corrected typo here
  country_name: Yup.string().required('Country name is required'),
});

export const provinceSchema = Yup.object().shape({
  province_code: Yup.string().required('Province code is required'),
  province_name: Yup.string().required('Province name is required'),
  country: Yup.string().required('Country is required'),
});

export const citySchema = Yup.object().shape({
  city_code: Yup.string().required('City code is required'),
  city_name: Yup.string().required('City name is required'),
  province: Yup.string().required('Province is required'),
  ring_area: Yup.string()
    .max(5, 'Ring area must be at most 5 characters')
    .optional(),
  location: Yup.string().optional(),
});
