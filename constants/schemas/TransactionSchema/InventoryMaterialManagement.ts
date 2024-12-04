import * as Yup from 'yup';

export const InitialStockSchema = Yup.object().shape({
  document_number: Yup.string().required('Document number is required'),
  document_date: Yup.string().required('Document date is required'),
  warehouse: Yup.string().required('Warehouse is required'),
  warehouse_code: Yup.string().required('Warehouse is required'),
  currency: Yup.string().required('Currency is required'),
  currency_code: Yup.string().required('Currency is required'),
  rate: Yup.string().required('Rate is required'),
  remark: Yup.string().required('Remark is required'),
  item: Yup.string().required('Item is required'),
  item_name: Yup.string().required('Item is required'),
  item_code: Yup.string().required('Item is required'),
  batch: Yup.string().required('Batch is required'),
  quantity: Yup.string().required('Quantity is required'),
  price: Yup.string().required('Price is required'),
  local_code: Yup.string().required('Local code is required'),
  uom_name: Yup.string().required('UOM name is required'),
});
