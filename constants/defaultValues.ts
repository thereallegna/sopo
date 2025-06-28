// Configuration General Start
export const CountryDefaultValues: CountryFormBody = {
    country_code: "",
    country_name: "",
};

export const ProvinceDefaultValues: ProvinceFormBody = {
    province_code: "",
    province_name: "",
    country_code: "",
    country: "",
};

export const CityDefaultValues: CityFormBody = {
    city_code: "",
    city_name: "",
    province: "",
    province_code: "",
    ring_area: "",
    location: "",
};

export const SiteDefaultValues: SiteFormBody = {
    site_code: "",
    site_name: "",
    address: "",
    active: true,
    remark: "",
};
// Configuration General End

// Configuration Material Management Start
export const UOMDefaultValues: UOMFormBody = {
    uom_code: "",
    uom_name: "",
};

export const ItemCategoryDefaultValues: ItemCategoryFormBody = {
    item_category_code: "",
    item_category_name: "",
    active: true,
    // coa_stock: '',
    // coa_sales: '',
    // coa_cogs: '',
    // coa_sales_return: '',
    // coa_purchase_return: '',
    // coa_consumption_cost: '',
};

export const MasterItemDefaultValues: MasterItemFormBody = {
    item_name: "",
    category_name: "",
    category_code: "",
    uom_code: "",
    uom_name: "",
    local_code: "",
    foreign_name: "",
    old_code: "",
    spesification: "",
    hs_code: "",
    remark: "",
    source: undefined,
    active: false,
    inventory_item: false,
    purchase_item: false,
    service_item: false,
    sales_item: false,
    tax_liable: false,
};

export const WarehouseCategoryDefaultValues: WarehouseCategoryFormBody = {
    warehouse_category_code: "",
    warehouse_category_name: "",
};

export const WarehouseDefaultValues: WarehouseFormBody = {
    warehouse_code: "",
    warehouse_name: "",
    warehouse_category_code: "",
    warehouse_category_name: "",
    city_code: "",
    city_name: "",
    postal_code: "",
    phone: "",
    fax: "",
    address: "",
    email: "",
    mobile: "",
    contact_person: "",
    remark: "",
};

// Configuration Material Management End

// Transaction Inventory Material Management Start
export const InitialStockDefaultValues: InitialStockFormBody = {
    document_number: "",
    document_date: "",
    warehouse_name: "",
    warehouse_code: "",
    currency_name: "",
    currency_code: "",
    rate: 0,
    remark: "",
    details: [],
};

export const StockAdjustmentDefaultValues: StockAdjustmentFormBody = {
    document_number: "",
    date: "",
    warehouse_code: "",
    warehouse_name: "",
    remark: "",
    details: [],
};

export const StockMutationDefaultValues: StockMutationFormBody = {
    document: "",
    date: "",
    warehouse: "",
    warehouse_code: "",
    cancel: false,
    reason_for_cancellation: "",
    remark: "",
    mutated_from: [],
    mutated_to: [],
};

export const DirectPurchaseReceiveDefaultValues: DirectPurchaseReceiveFormBody =
    {
        document_number: "",
        date: "",
        local_code: "",
        department: "",
        warehouse_name: "",
        warehouse_code: "",
        vendor: "",
        do: "",
        site: "",
        term_of_payment: "",
        currency_name: "",
        currency_code: "",
        tax: 0,
        total_tax: 0,
        discount_amount: 0,
        grand_total: 0,
        remark: "",
        project: "",
        details: [],
    };
// Transaction Inventory Material Management End

// Configuration Financial Management Start

export const CurrencyDefaultValues: CurrencyFormBody = {
    currency_code: "",
    currency_name: "",
};

export const TaxGroupDefaultValues: TaxGroupFormBody = {
    tax_group_code: "",
    tax_group_name: "",
};

export const TaxDefaultValues: TaxFormBody = {
    tax_code: "",
    tax_name: "",
    tax_rate: "",
    tax_group: "",
    tax_group_code: "",
};

// Configuration Financial Management End

// Configuration Procurememnt Management Start

export const VendorCategoryDefaultValues: VendorCategoryFormBody = {
    vendor_category_code: "",
    vendor_category_name: "",
};

export const VendorDefaultValues: VendorFormBody = {
    vendor_name: "",
    vendor_code: "",
    vendor_category_code: "",
    vendor_category: "",
    address: "",
    city: "",
    postal_code: "",
    website: "",
    head_office: "",
    phone: "",
    mobile: "",
    email: "",
    remark: "",
};

// Configuration Procurement Management End

// Zustand Pagination State
export const PaginationStateDefaultValue = {
    columnVisibility: {},
    pagination: {
        pageIndex: 0,
        pageSize: 10,
    },
    grouping: [],
    rowSize: undefined,
    query: {},
};
