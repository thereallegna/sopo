/* ======================= Configuration Start ==================== */
type CountryFormBody = {
  country_code: string;
  country_name: string;
};

type ProvinceFormBody = {
  province_code: string;
  province_name: string;
  country: string;
};

type CityFormBody = {
  city_code: string;
  city_name: string;
  province: string;
  ring_area?: string;
  location?: string;
};
/* ======================= Configuration End ==================== */

/* ======================= Inventory and Material Management Start ==================== */
type UOMFormBody = {
  uom_code: string;
  uom_name: string;
};

type CategoryMMFormBody = {
  item_category_code: string;
  item_category_name: string;
  active: string;
  create_date: string;
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
  cos_consumption_cost_description?: string;
};
/* ======================= Inventory and Material Management End ==================== */
