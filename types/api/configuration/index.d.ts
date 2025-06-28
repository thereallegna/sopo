/* ======================= Configuration Start ==================== */
type CountryFormBody = {
    country_code: string;
    country_name: string;
};

type ProvinceFormBody = {
    province_code: string;
    province_name: string;
    country_code: string;
    country: string;
};

type CityFormBody = {
    city_code: string;
    city_name: string;
    province: string;
    province_code: string;
    ring_area?: string | null;
    location?: string | null;
};

type SiteFormBody = {
    site_code: string;
    site_name: string;
    address?: string;
    active: boolean;
    remark?: string;
};
/* ======================= Configuration End ==================== */

/* ======================= Inventory and Material Management Start ==================== */
type UOMFormBody = {
    uom_code: string;
    uom_name: string;
};

type ItemCategoryFormBody = {
    item_category_code: string;
    item_category_name: string;
    active: boolean;
    // coa_stock?: string | null;
    // coa_stock_description?: string | null;
    // coa_sales?: string | null;
    // coa_sales_description?: string | null;
    // coa_cogs?: string | null;
    // coa_cogs_description?: string | null;
    // coa_sales_return?: string | null;
    // coa_sales_return_description?: string | null;
    // coa_purchase_return?: string | null;
    // coa_purchase_return_description?: string | null;
    // coa_consumption_cost?: string | null;
    // coa_consumption_cost_description?: string | null;
};

type MasterItemFormBody = {
    item_code?: string;
    item_name: string;
    active: boolean;
    category_name: string;
    category_code: string;
    uom_name: string;
    uom_code: string;
    source?: string | null;
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
    tax_liable?: boolean;
};

type WarehouseCategoryFormBody = {
    warehouse_category_code: string;
    warehouse_category_name: string;
};

type WarehouseFormBody = {
    warehouse_code: string;
    warehouse_name: string;
    warehouse_category_code?: string;
    warehouse_category_name?: string;
    address?: string;
    city_code: string;
    city_name: string;
    postal_code?: string;
    phone?: string;
    fax?: string;
    email?: string;
    mobile?: string;
    contact_person?: string;
    remark?: string;
};

/* ======================= Inventory and Material Management End ==================== */

/* ======================= Financial Management Start ==================== */
type CurrencyFormBody = {
    currency_code: string;
    currency_name: string;
};

type TaxGroupFormBody = {
    tax_group_code: string;
    tax_group_name: string;
};

type TaxFormBody = {
    tax_code: string;
    tax_name: string;
    tax_rate: string;
    tax_group: string;
    tax_group_code: string;
};

/* ======================= Financial Management End ==================== */

/* ======================= Procurement Management Start ==================== */

type VendorCategoryFormBody = {
    vendor_category_code: string;
    vendor_category_name: string;
};

type VendorFormBody = {
    vendor_code: string;
    vendor_name: string;
    vendor_category_code: string;
    vendor_category: string;
    address?: string;
    city?: string;
    postal_code?: string;
    website?: string;
    head_office?: string;
    phone?: string;
    mobile?: string;
    email?: string;
    remark?: string;
};

/* ======================= Procurement Management End ==================== */
