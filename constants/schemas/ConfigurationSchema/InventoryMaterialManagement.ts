import * as Yup from 'yup';

export const UOMSchema = Yup.object().shape({
  uom_code: Yup.string().required('UoM code is required'),
  uom_name: Yup.string().required('UoM name is required'),
});

export const itemCategorySchema = Yup.object().shape({
  item_category_code: Yup.string().required('Item Category code is required'),
  item_category_name: Yup.string().required('Item Category name is required'),
  active: Yup.boolean().required('Active is required'),
});

// export const createMasterItemSchema = Yup.object().shape({
//     item_code: Yup.string().required("Item code is required"),
//     item_name: Yup.string().required("Item name is required"),
//     source: Yup.string().required("Source is required"),
//     local_code: Yup.string().required("Local code is required"),
//     foreign_name: Yup.string().required("Foreign name is required"),
//     inventory_item: Yup.boolean().required("Inventory item is required"),
//     sales_item: Yup.boolean().required("Sales item is required"),
//     purchase_item: Yup.boolean().required("Purchase item is required"),
//     item_category: Yup.string().required("Item category is required"),
//     item_category_code: Yup.string().required("Item category code is required"),
//     uom: Yup.string().required("uom is required"),
//     uom_code: Yup.string().required("uom_code is required"),
//     specification: Yup.string().required("specification is required"),
//     remark: Yup.string().required("Remark is required"),
// });

// export const editMasterItemSchema = Yup.object().shape({
//     item_code: Yup.string().required("Item code is required"),
//     item_name: Yup.string().required("Item name is required"),
// })

export const createMasterItemSchema = Yup.object().shape({
  item_name: Yup.string().required('Item name is required'),
  category_name: Yup.string().required('Category is required'),
  category_code: Yup.string().required('Category is required'),
  uom_name: Yup.string().required('UoM is required'),
  uom_code: Yup.string().required('UoM is required'),
  active: Yup.boolean().required('Active is required'),
});

export const editMasterItemSchema = Yup.object().shape({
  item_name: Yup.string().required('Item name is required'),
  active: Yup.boolean().required('Active is required'),
});

export const warehouseCategorySchema = Yup.object().shape({
  warehouse_category_code: Yup.string().required(
    'Warehouse category code is required'
  ),
  warehouse_category_name: Yup.string().required(
    'Warehouse category name is required'
  ),
});

export const warehouseSchema = Yup.object().shape({
  warehouse_code: Yup.string().required('Warehouse code is required'),
  warehouse_name: Yup.string().required('Warehouse name is required'),
  warehouse_category: Yup.string().required('Warehouse category is required'),
  warehouse_category_code: Yup.string().required(
    'Warehouse category is required'
  ),
  address: Yup.string().required('Address is required'),
  city: Yup.string().required('City is required'),
  city_code: Yup.string().required('City code is required'),
  phone: Yup.string().required('Phone number is required'),
});
