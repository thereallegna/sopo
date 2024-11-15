// Configuration General Start
export const countryDefaultValues: CountryFormBody = {
  country_code: '',
  country_name: '',
};

export const provinceDefaultValues: ProvinceFormBody = {
  province_code: '',
  province_name: '',
  country: '',
};

export const cityDefaultValues: CityFormBody = {
  city_code: '',
  city_name: '',
  province: '',
  ring_area: '',
  location: '',
};
// Configuration General End

// Configuration Material Management Start
export const UOMDefaultValues: UOMFormBody = {
  uom_code: '',
  uom_name: '',
};

export const CategoryMMDefaultValues: CategoryMMFormBody = {
  categoryMM_code: '',
  categoryMM_name: '',
};
// Configuration Material Management End

// Zustand Pagination State
export const paginationStateDefaultValue = {
  columnVisibility: {},
  pagination: {
    pageIndex: 0,
    pageSize: 10,
  },
  grouping: [],
  rowSize: undefined,
};
