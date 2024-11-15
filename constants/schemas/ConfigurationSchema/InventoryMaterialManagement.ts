import * as Yup from 'yup';

export const UOMSchema = Yup.object().shape({
  uom_code: Yup.string().required('Country code is required'), // Corrected typo here
  uom_name: Yup.string().required('Country name is required'),
});

export const CategoryMMSchema = Yup.object().shape({
  categoryMM_code: Yup.string().required('Category MM code is required'),
  categoryMM_name: Yup.string().required('Category MM name is required'),
});
