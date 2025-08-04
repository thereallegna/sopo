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

type StockMutatedFromFormBody = {
    item_code: string;
    item_name: string;
    batch?: string;
    stock: number;
    quantity: number;
    uom: string;
    source?: string;
    remark?: string;
};

type StockMutatedToFormBody = {
    item_code: string;
    item_name: string;
    batch?: string;
    quantity: number;
    uom: string;
    source?: string;
    remark?: string;
};

type StockMutationFormBody = {
    document_number: string;
    date: string;
    warehouse: string;
    warehouse_code: string;
    batch: string;
    source: string;
    cancel: boolean;
    reason_for_cancellation?: string;
    remark?: string;
    from_array: StockMutatedFromFormBody[];
    to_array: StockMutatedToFormBody[];
};

type ItemsQuery = {
    warehouse?: string;
    item_category?: string;
    item_name?: string;
};

type DirectPurchaseReceiveDetailFormBody = {
    d_no: string;
    item_name: string;
    item_code: string;
    local_code?: string;
    batch: string;
    quantity?: number;
    uom_name: string;
    price: number;
    discount?: number;
    expired?: string;
    cancel: boolean;
    cancel_reason: string;
};

type DirectPurchaseReceiveFormBody = {
    document_number: string;
    document_date: string;
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
