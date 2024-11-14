/* ======================= Configuration Start ==================== */
type CountryFormBody = {
  country_code: string;
  country_name: string;
};

type CityFormBody = {
  city_code: string;
  city_name: string;
  province: string;
  ring_area: string;
  location: string;
};
/* ======================= Configuration End ==================== */

/* ======================= Inventory and Material Management Start ==================== */
type UOMFormBody = {
  uom_code: string;
  uom_name: string;
};
/* ======================= Inventory and Material Management End ==================== */
