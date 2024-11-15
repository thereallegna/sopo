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
  categoryMM_code: string;
  categoryMM_name: string;
};
/* ======================= Inventory and Material Management End ==================== */
