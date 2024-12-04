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
  coa_stock?: string | null;
  coa_stock_description?: string | null;
  coa_sales?: string | null;
  coa_sales_description?: string | null;
  coa_cogs?: string | null;
  coa_cogs_description?: string | null;
  coa_sales_return?: string | null;
  coa_sales_return_description?: string | null;
  coa_purchase_return?: string | null;
  coa_purchase_return_description?: string | null;
  coa_consumption_cost?: string | null;
  coa_consumption_cost_description?: string | null;
};

type MasterItemFormBody = {
  item_code?: string;
  item_name: string;
  active: boolean;
  category_name: string;
  category_code: string;
  uom_name: string;
  uom_code: string;
  source?: string | null;
  local_code?: string;
  foreign_name?: string;
  old_code?: string;
  spesification?: string;
  item_request?: string;
  hs_code?: string;
  remark?: string;
  inventory_item?: boolean;
  sales_item?: boolean;
  purchase_item?: boolean;
  service_item?: boolean;
  tax_liable?: boolean;
};

/* ======================= Inventory and Material Management End ==================== */
