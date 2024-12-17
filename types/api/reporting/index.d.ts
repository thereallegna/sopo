/* ======================= Reporting Start ==================== */
type StockSummaryDetailFormBody = {
  warehouse_code: string;
  warehouse_name: string;
  item_code: string;
  local_code: string;
  item_name: string;
  active: string;
  quantity: string;
  uom: string;
};

type StockSummaryFormBody = {
  warehouse_code: string;
  warehouse_name: string;
  item_category_code: string;
  item_category_name: string;
  item_code: string;
  item_name: string;
  date: string;
  details: StockSummaryDetailFormBody[];
};

type StockSummaryFilterQuery = {
  item_category?: string;
  item_category_name?: string;
  item_code?: string;
  item_name?: string;
  warehouse?: string;
  date?: string;
};

type StockMovementDetailFormBody = {
  doc_type: string;
  doc_no: string;
  doc_date: string;
  warehouse_code: string;
  warehouse_name: string;
  item_code: string;
  item_name: string;
  batch_no: string;
  source: string;
  quantity: string;
  uom_name: string;
  remark: string;
  created_by: string;
  item_specification: string;
};

type StockMovementFormBody = {
  date: string;
  warehouse_code: string;
  warehouse_name: string;
  type: string;
  item_category: string;
  item_code: string;
  item_name: string;
  batch: string;
  document_number: string;
  details: StockMovementDetailFormBody[];
};
/* ======================= Reporting End ==================== */
