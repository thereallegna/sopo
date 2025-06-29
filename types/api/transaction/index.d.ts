/* ======================= Inventory Material Management Start ==================== */
type InitialStockDetailFormBody = {
    item_code: string;
    item_name: string;
    local_code?: string;
    batch?: string;
    quantity: number;
    uom: string;
    price: number;
    cancel: boolean;
};

type InitialStockFormBody = {
    document_number: string;
    document_date: string;
    warehouse_name: string;
    warehouse_code: string;
    currency_name: string;
    currency_code: string;
    rate: number;
    remark?: string;
    details: InitialStockDetailFormBody[];
};

type StockAdjustmentDetailFormBody = {
    d_no: string;
    item_name: string;
    item_code: string;
    batch: string;
    stock_system: number;
    stock_actual: number;
    balance: number;
    uom_name: string;
    specification: string;
};

type StockAdjustmentFormBody = {
    document_number: string;
    date: string;
    warehouse_code: string;
    warehouse_name: string;
    remark: string;
    details: StockAdjustmentDetailFormBody[];
};

type TransactionItem = {
    item_code: string;
    item_name: string;
    batch: string;
    stock: number;
    uom_name: string;
};

type StockMutatedFormBody = {
    document_number: string;
    item_code: string;
    item_name: string;
    batch: string;
    stock: number;
    quantity: string;
    uom: string;
    currency_code: string;
    currency: string;
    unit_price: string;
};

type StockMutationFormBody = {
    document: string;
    date: string;
    warehouse: string;
    warehouse_code: string;
    cancel: boolean;
    reason_for_cancellation?: string;
    remark?: string;
    mutated_from: StockMutatedFormBody[];
    mutated_to: StockMutatedFormBody[];
};

type ItemsQuery = {
    warehouse?: string;
    item_category?: string;
    item_name?: string;
};

type DirectPurchaseReceiveDetailFormBody = {
    item_name: string;
    item_code: string;
    batch: string;
    price?: number;
    quantity?: number;
    discount?: number;
    remark: string;
    expired?: string;
    cancel: boolean;
    cancel_reason: string;
};

type DirectPurchaseReceiveFormBody = {
    document_number: string;
    date: string;
    local_code?: string;
    department?: string;
    warehouse_name: string;
    warehouse_code: string;
    vendor_name: string;
    vendor_code: string;
    site_name: string;
    site_code: string;
    term_of_payment?: string;
    currency_name: string;
    currency_code: string;
    tax_name: string;
    tax_code: string;
    remark?: string;
    details: DirectPurchaseReceiveDetailFormBody[];
};

/* ======================= Inventory Material Management End ==================== */
