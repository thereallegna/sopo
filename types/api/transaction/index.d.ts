type StockMutatedFormBody = {
  item_code: string
  item_name: string
  batch: string
  stock: number
  quantity: string
  uom: string
  currency_code: string
  currency: string
  unit_price: string
}

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
/* ======================= Inventory Material Management Start ==================== */
type InitialStockFormBody = {
  document: string;
  date: string;
  warehouse: string;
  warehouse_code: string;
  currency: string;
  currency_code: string;
  rate: decimal;
  remark?: string | null;
  item: string;
  item_name: string;
  item_code: string;
  batch: string;
  quantity: string;
  price: string;
  local_code: string;
  uom_name: string;
  detail: any[];
};
/* ======================= Inventory Material Management End ==================== */
