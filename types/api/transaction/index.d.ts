/* ======================= Inventory Material Management Start ==================== */
type InitialStockDetailFormBody = {
  item_code: string;
  item_name: string;
  local_code?: string;
  batch: string;
  quantity: number;
  uom: string;
  unit_price: number;
};

type InitialStockFormBody = {
  document_number: string;
  document_date: string;
  warehouse_name: string;
  warehouse_code: string;
  currency_name: string;
  currency_code: string;
  rate: decimal;
  remark?: string;
  details: InitialStockDetailFormBody[];
};

// type InitialStockFormBody = {
//   document_number: string;
//   document_date: string;
//   warehouse_name: string;
//   warehouse_code: string;
//   currency_name: string;
//   currency_code: string;
//   rate: decimal;
//   remark?: string;
//   item_code: string;
//   item_name: string;
//   local_code?: string;
//   batch: string;
//   quantity: number;
//   uom: string;
//   unit_price: number;
// };

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
/* ======================= Inventory Material Management End ==================== */
