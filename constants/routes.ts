export const PATH_API = '/api';
export const PATH_BACKEND_URL = process.env.BACKEND_URL;
export const PATH_BACKEND_URL_VERSION = '/v1';

// initial start
export const PATH_CONFIGURATION_GENERAL = `${PATH_API}/configuration/general`;
export const PATH_CONFIGURATION_INVENTORY_AND_MATERIAL_MANAGEMENT = `${PATH_API}/configuration/inventory-and-material-management`;
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
export const PATH_COUNTRY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/country`;

// city
export const PATH_CITY = `${PATH_CONFIGURATION_GENERAL}/city`;
export const PATH_CITY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/city`;

// province
export const PATH_PROVINCE = `${PATH_CONFIGURATION_GENERAL}/province`;
export const PATH_PROVINCE_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/province`;
/* ======================= General End ==================== */

/* ======================= Inventory and Material Management Start ==================== */
// items uom
export const PATH_ITEMS_UOM = `${PATH_CONFIGURATION_INVENTORY_AND_MATERIAL_MANAGEMENT}/material-management/uom`;
export const PATH_ITEMS_UOM_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/uom`;

// items category
export const PATH_ITEMS_CATEGORY = `${PATH_CONFIGURATION_INVENTORY_AND_MATERIAL_MANAGEMENT}/material-management/category`;
export const PATH_ITEMS_CATEGORY_BE = `${PATH_BACKEND_URL}${PATH_BACKEND_URL_VERSION}/category`;
/* ======================= Inventory and Material Management End ==================== */
