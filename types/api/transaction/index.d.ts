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
  cancel: boolean;
  reason_for_cancellation?: string;
  remark?: string;
  mutated_from: StockMutatedFormBody[];
  mutated_to: StockMutatedFormBody[];
};
/* ======================= Inventory Material Management Start ==================== */
type InitialStockDetailFormBody = {
  item_code: string;
  item_name: string;
  local_code: string;
  batch: string;
  quantity: string;
  uom: string;
  unit_price: string;
};

type InitialStockFormBody = {
  document: string;
  date: string;
  warehouse: string;
  warehouse_code: string;
  currency: string;
  currency_code: string;
  rate: decimal;
  remark?: string;
  detail: InitialStockDetailFormBody[];
};

type StockMutatedFormBody = {
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
  cancel: boolean;
  reason_for_cacellation?: string;
  remark?: string;
  mutated_from: StockMutatedFormBody[];
  mutated_to: StockMutatedFormBody[];
};
/* ======================= Inventory Material Management End ==================== */
