import * as Yup from 'yup';

export const UOMSchema = Yup.object().shape({
  uom_code: Yup.string().required('Country code is required'), // Corrected typo here
  uom_name: Yup.string().required('Country name is required'),
});
