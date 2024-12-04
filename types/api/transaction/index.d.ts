/* ======================= Inventory Material Management Start ==================== */
type InitialStockFormBody = {
  document_number: string;
  document_date: string;
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
};
/* ======================= Inventory Material Management End ==================== */
