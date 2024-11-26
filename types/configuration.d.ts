/* ======================= General End ==================== */
type ICountry = {
  number?: number;
  country_code: string;
  country_name: string;
  create_date: string;
};

type IProvince = {
  number?: number;
  province_code: string;
  province_name: string;
  country: string;
  country_code: string;
  create_date: string;
};

type ICity = {
  number: number;
  city_code: string;
  city_name: string;
  province: string;
  province_code: string;
  ring_area?: string;
  create_date: string;
  location?: string;
};
/* ======================= General End ==================== */

/* ======================= Inventory and Material Management Start ==================== */
type IUOM = {
  number?: number;
  uom_code: string;
  uom_name: string;
  create_date: string;
};

type IItemCategory = {
  number?: number;
  item_category_code: string;
  item_category_name: string;
  active: boolean;
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
  coa_consumption_cost_Description?: string;
};

type IItemMM = {
  number?: number;
  item_code: string;
  item_name: string;
  active: boolean;
  category_name: string;
  category_code: string;
  uom_name: string;
  uom_code: string;
  source?: string;
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
  tax_liablepackage?: boolean;
};

type ICoa = {
  account: string;
  number?: number;
  description: string;
};
/* ======================= Inventory and Material Management End ==================== */
