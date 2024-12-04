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
  active: true,
  inventory_item: false,
  purchase_item: false,
  service_item: false,
  sales_item: false,
  tax_liable: false,
};
// Configuration Material Management End

// Transaction Inventory Material Management Start
export const InitialStockDefaultValues: InitialStockFormBody = {
  document_number: '',
  document_date: '',
  warehouse: '',
  warehouse_code: '',
  currency: '',
  currency_code: '',
  rate: '',
  remark: '',
  item: '',
  item_name: '',
  item_code: '',
  batch: '',
  quantity: '',
  price: '',
  local_code: '',
  uom_name: '',
};
// Transaction Inventory Material Management End

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
