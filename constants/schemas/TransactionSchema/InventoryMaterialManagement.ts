import * as Yup from 'yup';

export const CreateInitialStockSchema = Yup.object().shape({
  document: Yup.string().required('Document number is required'),
  date: Yup.string().required('Document date is required'),
  warehouse: Yup.string().required('Warehouse is required'),
  warehouse_code: Yup.string().required('Warehouse Code is required'),
  currency: Yup.string().required('Currency is required'),
  currency_code: Yup.string().required('Currency Code is required'),
  rate: Yup.string().required('Rate is required'),
  detail: Yup.array(
    Yup.object().shape({
      item_code: Yup.string().required('Item Code is required'),
      item_name: Yup.string().required('Item Name is required'),
      local_code: Yup.string().required('Local Code is required'),
      batch: Yup.string().required('Batch is required'),
      quantity: Yup.number().required('Quantity is required'),
      uom: Yup.string().required('UOM is required'),
      unit_price: Yup.string().required('Price is required'),
    })
  ),
});

export const CreateStockMutationSchema = Yup.object().shape({
  document_number: Yup.string().required('Document is required'),
  date: Yup.date().required('Date is required'),
  warehouse: Yup.string().required('Warehouse is required'),
  warehouse_code: Yup.string().required('Warehouse is required'),
  mutated_from: Yup.array(
    Yup.object().shape({
      document_number: Yup.string().required('Document is required'),
      item_code: Yup.string().required('Item code is required'),
      item_name: Yup.string().required('Item name is required'),
      batch: Yup.string().required('Batch is required'),
      stock: Yup.number().required('Stock is required'),
      quantity: Yup.number().required('Quantity is required'),
      currency: Yup.string().required('Currency is required'),
      unit_price: Yup.string().required('Price is required'),
    })
  ).min(1),
  mutated_to: Yup.array(
    Yup.object().shape({
      document_number: Yup.string().required('Document is required'),
      item_code: Yup.string().required('Item code is required'),
      item_name: Yup.string().required('Item name is required'),
      batch: Yup.string().required('Batch is required'),
      stock: Yup.number().required('Stock is required'),
      quantity: Yup.number().required('Quantity is required'),
      currency: Yup.string().required('Currency is required'),
      unit_price: Yup.string().required('Price is required'),
    })
  ).min(1),
});
