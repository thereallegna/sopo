import * as Yup from 'yup';

export const vendorCategorySchema = Yup.object().shape({
  vendor_category_code: Yup.string().required(
    'Vendor category code is required'
  ),
  vendor_category_name: Yup.string().required(
    'Vendor category name is required'
  ),
});

export const vendorSchema = Yup.object().shape({
  vendor_code: Yup.string().required('Vendor code is required'),
  vendor_name: Yup.string().required('Vendor name is required'),
  vendor_category: Yup.string().required('Vendor category is required'),
  vendor_category_code: Yup.string().required(
    'Vendor category code is required'
  ),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  postal_code: Yup.string().required('Postal code is required'),
  website: Yup.string().required('Website is requirede'),
  head_office: Yup.string().required('Head Office is required'),
  phone: Yup.string().required('Phone is required'),
  mobile: Yup.string().required('Mobile is requried'),
  email: Yup.string().required('Email is required'),
  remark: Yup.string().required('Remark is required'),
});
