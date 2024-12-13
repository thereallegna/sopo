// Configuration General Start
export const countryDefaultValues: CountryFormBody = {
  country_code: '',
  country_name: '',
};

export const provinceDefaultValues: ProvinceFormBody = {
  province_code: '',
  province_name: '',
  country_code: '',
  country: '',
};

export const cityDefaultValues: CityFormBody = {
  city_code: '',
  city_name: '',
  province: '',
  province_code: '',
  ring_area: '',
  location: '',
};
// Configuration General End

// Configuration Material Management Start
export const UOMDefaultValues: UOMFormBody = {
  uom_code: '',
  uom_name: '',
};

export const ItemCategoryDefaultValues: ItemCategoryFormBody = {
  item_category_code: '',
  item_category_name: '',
  active: true,
  coa_stock: '',
  coa_sales: '',
  coa_cogs: '',
  coa_sales_return: '',
  coa_purchase_return: '',
  coa_consumption_cost: '',
};

export const masterItemDefaultValues: MasterItemFormBody = {
  item_name: '',
  category_name: '',
  category_code: '',
  uom_code: '',
  uom_name: '',
  local_code: '',
  foreign_name: '',
  old_code: '',
  spesification: '',
  hs_code: '',
  remark: '',
  source: undefined,
  active: false,
  inventory_item: false,
  purchase_item: false,
  service_item: false,
  sales_item: false,
  tax_liable: false,
};

export const warehouseCategoryDefaultValues: WarehouseCategoryFormBody = {
  whs_ct_code: '',
  whs_ct_name: '',
};

// Configuration Material Management End

// Transaction Inventory Material Management Start
export const InitialStockDefaultValues: InitialStockFormBody = {
  document_number: '',
  document_date: '',
  warehouse_name: '',
  warehouse_code: '',
  currency_name: '',
  currency_code: '',
  rate: '',
  remark: '',
  details: [],
};

// export const InitialStockDefaultValues: InitialStockFormBody = {
//   document_number: '',
//   document_date: '',
//   warehouse_name: '',
//   warehouse_code: '',
//   currency_name: '',
//   currency_code: '',
//   rate: '',
//   remark: '',
//   item_code: '',
//   item_name: '',
//   local_code: '',
//   batch: '',
//   quantity: 0,
//   uom: '',
//   unit_price: 0,
// }

export const StockMutationDefaultValues: StockMutationFormBody = {
  document: '',
  date: '',
  warehouse: '',
  warehouse_code: '',
  cancel: false,
  reason_for_cancellation: '',
  remark: '',
  mutated_from: [],
  mutated_to: [],
};
// Transaction Inventory Material Management End

// Reporting Inventory Material Management Start
export const StockSummaryDefaultValues: StockSummaryFormBody = {
  warehouse_code: '',
  warehouse_name: '',
  item_category_code: '',
  item_category_name: '',
  item_code: '',
  item_name: '',
  date: '',
  local_code: '',
  active: true,
  quantity: '',
  uom: '',
};

export const StockMovementDefaultValues: StockMovementFormBody = {
  date: '',
  warehouse_name: '',
  warehouse_code: '',
  type: '',
  item_category: '',
  item_code: '',
  item_name: '',
  batch: '',
  document_number: '',
};
// Reporting Inventory Material Management End

// Configuration Financial Management Start

export const currencyDefaultValues: CurrencyFormBody = {
  currency_code: '',
  currency_name: '',
};

// Configuration Financial Management End

// Zustand Pagination State
export const paginationStateDefaultValue = {
  columnVisibility: {},
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  grouping: [],
  rowSize: undefined,
};
