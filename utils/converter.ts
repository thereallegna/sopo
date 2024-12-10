// export function convertInitialStockForm(item: MasterItemFormBody): InitialStockDetailFormBody {
//   return {
//     item_code: item.item_code,
//     item_name: item.item_name,
//     local_code: item.local_code,
//     batch: item.batch,
//     quantity: item.quantity,
//     uom: item.uom_name,
//     unit_price: item.price,
//   }
// }

export function convertStockMutationForm(
  stock: InitialStockFormBody,
  item: InitialStockDetailFormBody
): StockMutatedFormBody {
  return {
    document_number: stock.document,
    item_code: item.item_code,
    item_name: item.item_name,
    batch: item.batch,
    stock: 0,
    quantity: item.quantity,
    uom: item.uom,
    currency: stock.currency,
    currency_code: stock.currency_code,
    unit_price: item.unit_price,
  };
}
