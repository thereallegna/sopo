/* ======================= General End ==================== */
interface ICountry {
  number?: number;
  country_code: string;
  country_name: string;
  create_date: string;
}

interface IProvince {
  number?: number;
  province_code: string;
  province_name: string;
  country: string;
  country_code: string;
  create_date: string;
}

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
interface IUOM {
  number?: number;
  uom_code: string;
  uom_name: string;
  create_date: string;
}

interface ICategoryMM {
  number?: number;
  categoryMM_code: string;
  categoryMM_name: string;
  create_date: string;
}
/* ======================= Inventory and Material Management End ==================== */
