import * as Yup from 'yup';

export const CreateInitialStockSchema = Yup.object().shape({
  document_date: Yup.string().required('Document date is required'),
  warehouse_name: Yup.string().required('Warehouse is required'),
  warehouse_code: Yup.string().required('Warehouse Code is required'),
  currency_name: Yup.string().required('Currency is required'),
  currency_code: Yup.string().required('Currency Code is required'),
  rate: Yup.number()
    .nullable()
    .transform((value, originalValue) =>
      originalValue === '' ? null : Number(originalValue)
    )
    .required('Rate is required'),
  details: Yup.array(
    Yup.object().shape({
      item_code: Yup.string().required('Item Code is required'),
      item_name: Yup.string().required('Item Name is required'),
      // local_code: Yup.string().required('Local Code is required'),
      quantity: Yup.number().required('Quantity is required'),
      uom: Yup.string().required('UOM is required'),
      price: Yup.number().required('Price is required'),
    })
  ).required('Details is required'),
});

export const EditInitialStockSchema = Yup.object().shape({
  details: Yup.array(
    Yup.object().shape({
      cancel: Yup.boolean().required('Cancel is required'),
    })
  ),
});

export const StockAdjustmentSchema = Yup.object().shape({
  date: Yup.string().required('Document date is required'),
  warehouse_name: Yup.string().required('Warehouse is required'),
  warehouse_code: Yup.string().required('Warehouse Code is required'),
  details: Yup.array(
    Yup.object().shape({
      item_code: Yup.string().required('Item Code is required'),
      batch: Yup.string().required('Item Name is required'),
      stock_system: Yup.number().required('Quantity is required'),
      stock_actual: Yup.number().required('Price is required'),
    })
  ),
});

export const CreateStockMutationSchema = Yup.object().shape({
  document: Yup.string().required('Document is required'),
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
  ).optional(),
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
  ).optional(),
});

export const CreateDirectPurchaseReceiveSchema = Yup.object().shape({
  date: Yup.string().required('Date is required'),
  department: Yup.string().required('Department is required'),
  warehouse_name: Yup.string().required('Warehouse Name is required'),
  warehouse_code: Yup.string().required('Warehouse Code is required'),
  vendor: Yup.string().required('Vendor is required'),
  term_of_peyment: Yup.string().required('Term of Payment is required'),
  currency_name: Yup.string().required('Currency Name is required'),
  currency_code: Yup.string().required('Currency Code is required'),
  details: Yup.array(
    Yup.object().shape({
      item_name: Yup.string().required('Item Name is required'),
      local_code: Yup.string().required('Local Code is required'),
      batch: Yup.string().required('Batch is required'),
      uom: Yup.string().required('UOM is required'),
      total: Yup.number()
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : Number(originalValue)
        )
        .required('Total is required'),
      remark: Yup.string().required('Remark is required'),
    })
  ).required('Details is required'),
});

export const EditDirectPurchaseReceiveSchema = Yup.object().shape({
  details: Yup.array(
    Yup.object().shape({
      cancel: Yup.boolean().required('Cancel is required'),
      cancel_reason: Yup.boolean().required('Cancel Reason is required'),
    })
  ),
});

export const CreateDirectSalesDeliverySchema = Yup.object().shape({
  date: Yup.string().required('Date is required'),
  warehouse_name: Yup.string().required('Warehouse Name is required'),
  warehouse_code: Yup.string().required('Warehouse Code is required'),
  customer: Yup.string().required('Customer is required'),
  shipping_name: Yup.string().required('Shipping Name is required'),
  currency_name: Yup.string().required('Currency Name is required'),
  currency_code: Yup.string().required('Currency Code is required'),
  details: Yup.array(
    Yup.object().shape({
      item_name: Yup.string().required('Item Name is required'),
      batch: Yup.string().required('Batch is required'),
      stock: Yup.number()
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : Number(originalValue)
        )
        .required('Stock is required'),
      uom: Yup.string().required('UOM is required'),
      amount: Yup.number()
        .nullable()
        .transform((value, originalValue) =>
          originalValue === '' ? null : Number(originalValue)
        )
        .required('Amount is required'),
      remark: Yup.string().required('Remark is required'),
    })
  ),
});

export const EditDirectSalesDeliverySchema = Yup.object().shape({
  details: Yup.array(
    Yup.object().shape({
      cancel: Yup.boolean().required('Cancel is required'),
    })
  ),
});
