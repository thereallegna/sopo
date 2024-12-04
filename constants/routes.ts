export const PATH_API = '/api';
export const PATH_BACKEND_URL = process.env.BACKEND_URL;
export const PATH_BACKEND_URL_VERSION = '/v1';

// initial start
export const PATH_CONFIGURATION_GENERAL = `${PATH_API}/configuration/general`;
export const PATH_CONFIGURATION_INVENTORY_AND_MATERIAL_MANAGEMENT = `${PATH_API}/configuration/inventory-and-material-management`;
export const PATH_CONFIGURATION_INVENTORY_MATERIAL_MANAGEMENT = `${PATH_API}/transaction/inventory-material-management`;
export const PATH_CONFIGURATION_FINANCIAL_MANAGEMENT = `${PATH_API}/configuration/financial-management`;
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
export const PATH_COUNTRY = `${PATH_CONFIGURATION_GENERAL}/country`;
// country
export const PATH_COUNTRY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/country`;

// city
export const PATH_CITY = `${PATH_CONFIGURATION_GENERAL}/city`;
export const PATH_CITY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/city`;

// province
export const PATH_PROVINCE = `${PATH_CONFIGURATION_GENERAL}/province`;
export const PATH_PROVINCE_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/province`;

// coa
export const PATH_COA = `${PATH_CONFIGURATION_GENERAL}/coa`;
export const PATH_COA_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/coa`;
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

/* ======================= Inventory and Material Management End ==================== */

/* ======================= Inventory Material Management Start ==================== */
// initial stock
export const PATH_INITIAL_STOCK = `${PATH_CONFIGURATION_INVENTORY_MATERIAL_MANAGEMENT}/inventory-management/initial-stock`;
export const PATH_INITIAL_STOCK_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/initial-stock`;

/* ======================= Log History Start ==================== */
export const PATH_LOG_HISTORY = `${PATH_API}/log`;
export const PATH_LOG_HISTORY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/log`;
/* ======================= Log History End ==================== */

/* ======================= Financial Management Start ==================== */

// currency
export const PATH_CURRENCY = `${PATH_CONFIGURATION_FINANCIAL_MANAGEMENT}/currency`;
export const PATH_CURRENCY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/currency`;
/* ======================= Financial Management End ==================== */
