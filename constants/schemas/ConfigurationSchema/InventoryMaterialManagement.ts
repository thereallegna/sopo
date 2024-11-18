import * as Yup from 'yup';

export const UOMSchema = Yup.object().shape({
  uom_code: Yup.string().required('Country code is required'), // Corrected typo here
  uom_name: Yup.string().required('Country name is required'),
});

export const ItemCategorySchema = Yup.object().shape({
  item_category_code: Yup.string().required('Category MM code is required'),
  item_category_name: Yup.string().required('Category MM name is required'),
  active: Yup.string().required('Active is required'),
});
