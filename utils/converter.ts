export function convertStockMutationForm(item: InitialStockFormBody): StockMutatedFormBody {
  return {
    item_code: item.item_code,
    item_name: item.item_name,
    batch: item.batch,
    stock: 0,
    quantity: item.quantity,
    uom: item.uom_name,
    currency: item.currency,
    currency_code: item.currency_code,
    unit_price: item.price
  }
}