import { parse, isValid, format } from 'date-fns';

export function convertInitialStockForm(
  item: MasterItemFormBody
): InitialStockDetailFormBody {
  // console.log('Cek Item -> ', item);
  return {
    item_code: item.item_code || '',
    item_name: item.item_name,
    local_code: item.local_code,
    batch: '',
    quantity: 0,
    uom: item.uom_name,
    price: 0,
    cancel: false,
  };
}

export const convertStockAdjustmentForm = (
  item: TransactionItem
): StockAdjustmentDetailFormBody => {
  console.log('Cek Item -> ', item);
  return {
    d_no: item.item_code,
    item_code: item.item_code,
    item_name: item.item_name,
    batch: item.batch || '',
    balance: Number(item.batch) || 0,
    stock_system: item.stock,
    stock_actual: 0,
    uom_name: item.uom_name,
    specification: '',
  };
};

export function replaceSlashes(input: string): string {
  return input.replace(/\//g, '-');
}

// export function convertStockMutationForm(
//   stock: InitialStockFormBody,
//   item: InitialStockDetailFormBody
// ): StockMutatedFormBody {
//   return {
//     document_number: stock.document,
//     item_code: item.item_code,
//     item_name: item.item_name,
//     batch: item.batch,
//     stock: 0,
//     quantity: item.quantity,
//     uom: item.uom,
//     currency: stock.currency,
//     currency_code: stock.currency_code,
//     unit_price: item.unit_price,
//   };
// }

export const convertDate = (date: string): string => {
  const inputFormat = 'dd/MMM/yyyy'; // Format input
  const outputFormat = 'yyyy-MM-dd'; // Format output

  // Parsing string menjadi objek Date
  const parsedDate = parse(date, inputFormat, new Date());

  // Validasi apakah hasil parsing adalah tanggal yang valid
  if (isValid(parsedDate)) {
    return format(parsedDate, outputFormat); // Format menjadi YYYY/MM/DD
  }

  return date; // Mengembalikan string kosong jika tanggal tidak valid
};
