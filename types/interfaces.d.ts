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
  create_date: string;
}

type ICity = {
  number: number;
  city_code: string;
  city_name: string;
  province: string;
  ring_area?: string;
  create_date: string;
  location?: string;
};
