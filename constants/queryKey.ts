export const SESSION_USER = "userSession";

// CONFIGURATION GENERAL START
export const GET_COUNTRY = "getCountry";
export const GET_CITY = "getCity";
export const GET_PROVINCE = "getProvince";
export const GET_SITE = "getSite";
// export const GET_COA = 'getCoa';
// CONFIGURATION GENERAL END

// CONFIGURATION INVENTORY AND MATERIAL MANAGEMENT START
export const GET_UOM = "getUom";
export const GET_CATEGORY_MATERIAL_MANAGEMENT = "getCategoryMaterialManagement";
export const GET_MASTER_ITEM_MATERIAL_MANAGEMENT =
    "getMasterItemMaterialManagement";
export const GET_WAREHOUSE = "getWarehouse";
export const GET_WAREHOUSE_CATEGORY = "getWarehouseCategory";
export const GET_DETAIL_MASTER_ITEM = "getDetailMasterItemMaterialManagement";
// CONFIGURATION INVENTORY AND MATERIAL MANAGEMENT END

// CONFIGURATION FINANCIAL MANAGEMENT START
export const GET_CURRENCY = "getCurrency";
export const GET_TAX_GROUP = "getTaxGroup";
export const GET_TAX = "getTax";
// CONFIGURATION FINANCIAL MANAGEMENT END

// CONFIGURATION PROCUREMENT MANAGEMENT START
export const GET_VENDOR_CATEGORY = "getVendorCategory";
export const GET_VENDOR = "getVendor";
// CONFIGURATION PROCUREMENT MANAGEMENT END

// TRANSACTION - INVENTORY MANAGEMENT (START)
export const GET_INITIAL_STOCK = "getInitialStock";
export const GET_DETAIL_INITIAL_STOCK = "getDetailInitialStock";
export const GET_DETAIL_BY_WAREHOUSE_INITIAL_STOCK =
    "getDetailByWarehouseInitialStock";

export const GET_STOCK_ADJUSTMENT = "getStockAdjustment";
export const GET_DETAIL_STOCK_ADJUSTMENT = "getDetailStockAdjustment";
export const GET_DETAIL_BY_WAREHOUSE_STOCK_ADJUSTMENT =
    "getDetailByWarehouseStockAdjustment";

export const GET_STOCK_MUTATION = "getStockMutation";
export const GET_DETAIL_STOCK_MUTATION = "getDetailStockMutation";
export const GET_DETAIL_BY_WAREHOUSE_STOCK_MUTATION =
    "getDetailByWarehouseStockMutation";

// TRANSACTION - INVENTORY MANAGEMENT (END)

// TRANSACTION - MATERIAL MANAGEMENT (START)
export const GET_DIRECT_PURCHASE_RECEIVE = "getDirectPurchaseReceive";
// TRANSACTION - MATERIAL MANAGEMENT (END)

// REPORTING - INVENTORY MANAGEMENT (START)
export const GET_STOCK_SUMMARY = "getStockSummary";
export const GET_STOCK_MOVEMENT = "getStockMovement";
// REPORTING - INVENTORY MANAGEMENT (END)

// lOG HISTORY  START
export const GET_LOG_HISTORY = "getLogHistory";
// lOG HISTORY  END
