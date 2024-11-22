import * as Yup from 'yup';

export const UOMSchema = Yup.object().shape({
  uom_code: Yup.string().required('Country code is required'), // Corrected typo here
  uom_name: Yup.string().required('Country name is required'),
});

export const ItemCategorySchema = Yup.object().shape({
  item_category_code: Yup.string().required('Category MM code is required'),
  item_category_name: Yup.string().required('Category MM name is required'),
  active: Yup.boolean().required('Active is required'),
});

export const MasterItemMMSchema = Yup.object().shape({
  item_code: Yup.string().required('Item code is required'),
  item_name: Yup.string().required('Item name is required'),
  category_code: Yup.string().required('Category name is required'),
  uom_code: Yup.string().required('UoM is required'),
  active: Yup.boolean().required('Active is required'),
});
