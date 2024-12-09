import * as Yup from 'yup';

export const InitialStockSchema = Yup.object().shape({
  document_number: Yup.string().required('Document number is required'),
  document_date: Yup.string().required('Document date is required'),
  warehouse: Yup.string().required('Warehouse is required'),
  warehouse_code: Yup.string().required('Warehouse is required'),
  currency: Yup.string().required('Currency is required'),
  currency_code: Yup.string().required('Currency is required'),
  rate: Yup.string().required('Rate is required'),
  item: Yup.string().required('Item is required'),
  item_name: Yup.string().required('Item is required'),
  item_code: Yup.string().required('Item is required'),
  batch: Yup.string().required('Batch is required'),
  quantity: Yup.string().required('Quantity is required'),
  price: Yup.string().required('Price is required'),
  local_code: Yup.string().required('Local code is required'),
  uom_name: Yup.string().required('UOM name is required'),
});

export const CreateStockMutationSchema = Yup.object().shape({
  document: Yup.string().required('Document is required'),
  date: Yup.date().required('Date is required'),
  warehouse: Yup.string().required('Warehouse is required'),
  mutated_from: Yup.array(
    Yup.object().shape({
      item_code: Yup.string().required('Item code is required'),
      item_name: Yup.string().required('Item name is required'),
      batch: Yup.string().required('Batch is required'),
      stock: Yup.number().required('Stock is required'),
      quantity: Yup.number().required('Quantity is required'),
      currency: Yup.string().required('Currency is required'),
      unit_price: Yup.string().required('Price is required'),
    })
  ),
});
