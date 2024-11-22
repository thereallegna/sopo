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

type ICategoryMM = {
  number?: number;
  item_category_code: string;
  item_category_name: string;
  active: boolean;
  create_date: string;
};

type IItemMM = {
  number?: number;
  item_code: string;
  item_name: string;
  active: boolean;
  category_code: string;
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
/* ======================= Inventory and Material Management End ==================== */
