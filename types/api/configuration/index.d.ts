/* ======================= Configuration Start ==================== */
type CountryFormBody = {
  country_code: string;
  country_name: string;
};

type ProvinceFormBody = {
  province_code: string;
  province_name: string;
  country_code: string;
  country: string;
};

type CityFormBody = {
  city_code: string;
  city_name: string;
  province: string;
  province_code: string;
  ring_area?: string | null;
  location?: string | null;
};
/* ======================= Configuration End ==================== */

/* ======================= Inventory and Material Management Start ==================== */
type UOMFormBody = {
  uom_code: string;
  uom_name: string;
};

type ItemCategoryFormBody = {
  item_category_code: string;
  item_category_name: string;
  active: boolean;
  coa_stock?: string;
  coa_stock_description?: string;
  coa_sales?: string;
  coa_sales_description?: string;
  coa_cogs?: string;
  coa_cogs_description?: string;
  coa_sales_return?: string;
  coa_sales_return_description?: string;
  coa_purchase_return?: string;
  coa_purchase_return_description?: string;
  coa_consumption_cost?: string;
  coa_consumption_cost_description?: string;
};

type ItemFormBody = {
  number?: number;
  item_code: string;
  item_name: string;
  local_code: string;
  foreign_name: string;
  old_code: string;
  category_name: string;
  spesification: string;
  active: boolean;
  create_date: string;
};
/* ======================= Inventory and Material Management End ==================== */
