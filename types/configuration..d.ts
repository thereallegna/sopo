/* ======================= General End ==================== */ interface ICountry {
  number?: number;
  country_code: string;
  country_name: string;
  create_date: string;
}

type ICity = {
  number: number;
  city_code: string;
  city_name: string;
  province: string;
  ring_area?: string | null;
  create_date: string;
  location?: string;
};
/* ======================= General End ==================== */

/* ======================= Inventory and Material Management Start ==================== */
interface IUOM {
  number?: number;
  uom_code: string;
  uom_name: string;
  create_date: string;
}
/* ======================= Inventory and Material Management End ==================== */
