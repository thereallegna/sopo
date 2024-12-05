type StockMutationFormBody = {
  document: string;
  date: string;
  warehouse: string;
  cancel: boolean;
  reason_for_cacellation?: string;
  remark?: string;
  mutated_from: any[];
};
