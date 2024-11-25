// Configuration General Start
export const countryDefaultValues: CountryFormBody = {
  country_code: '',
  country_name: '',
};

export const provinceDefaultValues: ProvinceFormBody = {
  province_code: '',
  province_name: '',
  country_code: '',
  country: '',
};

export const cityDefaultValues: CityFormBody = {
  city_code: '',
  city_name: '',
  province: '',
  province_code: '',
  ring_area: '',
  location: '',
};
// Configuration General End

// Configuration Material Management Start
export const UOMDefaultValues: UOMFormBody = {
  uom_code: '',
  uom_name: '',
};

export const ItemCategoryDefaultValues: ItemCategoryFormBody = {
  item_category_code: '',
  item_category_name: '',
  active: true,
};

export const masterItemDefaultValues: MasterItemFormBody = {
  item_code: '',
  item_name: '',
  category_code: '',
  uom_code: '',
  active: false,
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
