export const PATH_API = "/api";
export const PATH_BACKEND_URL = process.env.BACKEND_URL;
export const PATH_BACKEND_URL_VERSION = "/v1";

// initial start
export const PATH_CONFIGURATION_GENERAL = `${PATH_API}/configuration/general`;
export const PATH_CONFIGURATION_INVENTORY_AND_MATERIAL_MANAGEMENT = `${PATH_API}/configuration/inventory-and-material-management`;
export const PATH_TRANSACTION_INVENTORY_MATERIAL_MANAGEMENT = `${PATH_API}/transaction/inventory-material-management`;
export const PATH_REPORTING_INVENTORY_MATERIAL_MANAGEMENT = `${PATH_API}/reporting/inventory-material-management`;
export const PATH_CONFIGURATION_FINANCIAL_MANAGEMENT = `${PATH_API}/configuration/financial-management`;
export const PATH_CONFIGURATION_PROCUREMENT_MANAGEMENT = `${PATH_API}/configuration/procurement-management`;
// initial end

/* ======================= Auth Start ==================== */
// login
export const PATH_AUTH_LOGIN = `${PATH_API}/login`;
export const PATH_AUTH_LOGIN_BE = `${PATH_BACKEND_URL}/login`;

// Logout
export const PATH_AUTH_LOGOUT = `${PATH_API}/logout`;
export const PATH_AUTH_LOGOUT_BE = `${PATH_BACKEND_URL}/logout`;

// forgot password
export const PATH_AUTH_FORGOT_PASSWORD = `${PATH_API}/forgot-password`;
export const PATH_AUTH_FORGOT_PASSWORD_BE = `${PATH_BACKEND_URL}/forgot-password`;

// reset password
export const PATH_AUTH_RESET_PASSWORD = `${PATH_API}/reset-password`;
export const PATH_AUTH_RESET_PASSWORD_BE = `${PATH_BACKEND_URL}/reset-password`;
/* ======================= Auth End ==================== */

/* ======================= General Start ==================== */
// country
export const PATH_COUNTRY = `${PATH_CONFIGURATION_GENERAL}/country`;
export const PATH_COUNTRY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/country`;

// city
export const PATH_CITY = `${PATH_CONFIGURATION_GENERAL}/city`;
export const PATH_CITY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/city`;

// province
export const PATH_PROVINCE = `${PATH_CONFIGURATION_GENERAL}/province`;
export const PATH_PROVINCE_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/province`;

// coa
// export const PATH_COA = `${PATH_CONFIGURATION_GENERAL}/coa`;
// export const PATH_COA_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/coa`;

// site
export const PATH_SITE = `${PATH_CONFIGURATION_GENERAL}/site`;
export const PATH_SITE_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/site`;
/* ======================= General End ==================== */

/* ======================= Inventory and Material Management Start ==================== */
// items master
export const PATH_ITEMS_MASTER = `${PATH_CONFIGURATION_INVENTORY_AND_MATERIAL_MANAGEMENT}/material-management/item`;
export const PATH_ITEMS_MASTER_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/item`;

// item uom
export const PATH_ITEMS_UOM = `${PATH_CONFIGURATION_INVENTORY_AND_MATERIAL_MANAGEMENT}/material-management/uom`;
export const PATH_ITEMS_UOM_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/uom`;

// items category
export const PATH_ITEMS_CATEGORY = `${PATH_CONFIGURATION_INVENTORY_AND_MATERIAL_MANAGEMENT}/material-management/category`;
export const PATH_ITEMS_CATEGORY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/item-category`;

// warehouse
export const PATH_WAREHOUSE = `${PATH_CONFIGURATION_INVENTORY_AND_MATERIAL_MANAGEMENT}/material-management/warehouse`;
export const PATH_WAREHOUSE_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/warehouse`;

// warehouse category
export const PATH_WAREHOUSE_CATEGORY = `${PATH_CONFIGURATION_INVENTORY_AND_MATERIAL_MANAGEMENT}/material-management/warehouse-category`;
export const PATH_WAREHOUSE_CATEGORY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/warehouse-category`;

/* ======================= Inventory and Material Management End ==================== */

/* ======================= Inventory Material Management Start ==================== */
// initial stock
export const PATH_INITIAL_STOCK = `${PATH_TRANSACTION_INVENTORY_MATERIAL_MANAGEMENT}/inventory-management/initial-stock`;
export const PATH_INITIAL_STOCK_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/initial-stock`;

// stock adjustment
export const PATH_STOCK_ADJUSTMENT = `${PATH_TRANSACTION_INVENTORY_MATERIAL_MANAGEMENT}/inventory-management/stock-adjustment`;
export const PATH_STOCK_ADJUSTMENT_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/stock-adjustment`;

// getitem
export const PATH_GET_ITEM = `${PATH_API}/get-item`;
export const PATH_GET_ITEM_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/get-item`;

// stock mutation
export const PATH_STOCK_MUTATION = `${PATH_TRANSACTION_INVENTORY_MATERIAL_MANAGEMENT}/inventory-management/stock-mutation`;
export const PATH_STOCK_MUTATION_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/stock-mutation`;

// direct purchase receive
export const PATH_DIRECT_PURCHASE_RECEIVE = `${PATH_TRANSACTION_INVENTORY_MATERIAL_MANAGEMENT}/material-management/direct-purchase-receive`;
export const PATH_DIRECT_PURCHASE_RECEIVE_BE = `${PATH_TRANSACTION_INVENTORY_MATERIAL_MANAGEMENT}/direct-purchase-receive`;

// direct sales delivery
export const PATH_DIRECT_SALES_DELIVERY = `${PATH_TRANSACTION_INVENTORY_MATERIAL_MANAGEMENT}/material-management/direct-sales-delivery`;
export const PATH_DIRECT_SALES_DELIVERY_BE = `${PATH_TRANSACTION_INVENTORY_MATERIAL_MANAGEMENT}/direct-sales-delivery`;

/* ======================= Inventory Material Management Start ==================== */

/* ======================= Reporting Start ==================== */
// stock summary
export const PATH_STOCK_SUMMARY = `${PATH_REPORTING_INVENTORY_MATERIAL_MANAGEMENT}/inventory-management/stock-summary`;
export const PATH_STOCK_SUMMARY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/stock-summary`;

// stock movement
export const PATH_STOCK_MOVEMENT = `${PATH_REPORTING_INVENTORY_MATERIAL_MANAGEMENT}/inventory-management/stock-movement`;
export const PATH_STOCK_MOVEMENT_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/stock-movement`;

/* ======================= Log History Start ==================== */
export const PATH_LOG_HISTORY = `${PATH_API}/log`;
export const PATH_LOG_HISTORY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/log`;
/* ======================= Log History End ==================== */

/* ======================= Financial Management Start ==================== */
// currency
export const PATH_CURRENCY = `${PATH_CONFIGURATION_FINANCIAL_MANAGEMENT}/currency`;
export const PATH_CURRENCY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/currency`;

// tax group
export const PATH_TAX_GROUP = `${PATH_CONFIGURATION_FINANCIAL_MANAGEMENT}/tax-group`;
export const PATH_TAX_GROUP_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/tax-group`;

// tax
export const PATH_TAX = `${PATH_CONFIGURATION_FINANCIAL_MANAGEMENT}/tax`;
export const PATH_TAX_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/tax`;
/* ======================= Financial Management End ==================== */

/* ======================= Procurement Management Start ==================== */
// vendor
export const PATH_VENDOR = `${PATH_CONFIGURATION_PROCUREMENT_MANAGEMENT}/vendor`;
export const PATH_VENDOR_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/vendor`;

// vendor category
export const PATH_VENDOR_CATEGORY = `${PATH_CONFIGURATION_PROCUREMENT_MANAGEMENT}/vendor-category`;
export const PATH_VENDOR_CATEGORY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/vendor-category`;

/* ======================= Procurement Management End ==================== */
