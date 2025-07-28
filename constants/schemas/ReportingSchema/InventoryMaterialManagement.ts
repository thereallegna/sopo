import * as Yup from "yup";

export const StockSummarySchema = Yup.object().shape({
    warehouse_code: Yup.string().required("Warehouse Code is required"),
    warehouse_name: Yup.string().required("Warehouse Name is required"),
    item_category_code: Yup.string().required("Item Category Code is required"),
    item_category_name: Yup.string().required("Item Category Name is required"),
    item_code: Yup.string().required("Item Code is required"),
    item_name: Yup.string().required("Item Name is required"),
    date: Yup.string().required("Date is required"),
    details: Yup.array(
        Yup.object().shape({
            warehouse_code: Yup.string().required("Warehouse Code is required"),
            warehouse_name: Yup.string().required("Warehouse Name is required"),
            item_code: Yup.string().required("Item Code is required"),
            local_code: Yup.string().required("Local Code is required"),
            item_name: Yup.string().required("Item Name is required"),
            active: Yup.string().required("Active is required"),
            quantity: Yup.string().required("Quantity is required"),
            uom: Yup.string().required("UOM is required"),
        })
    ),
});

export const StockMovementSchema = Yup.object().shape({
    date: Yup.string().required("Date is required"),
    warehouse_code: Yup.string().required("Warehouse Code is required"),
    warehouse_name: Yup.string().required("Warehouse Name is required"),
    type: Yup.string().required("Type is reuqired"),
    item_category: Yup.string().required("Item Category is required"),
    item_code: Yup.string().required("Item Code is required"),
    item_name: Yup.string().required("Item Name is required"),
    batch: Yup.string().required("Batch is required"),
    document_number: Yup.string().required("Document Number is required"),
    details: Yup.array(
        Yup.object().shape({
            type: Yup.string().required("Type is required"),
            document_number: Yup.string().required(
                "Document Number is required"
            ),
            date: Yup.string().required("Date is required"),
            warehouse_code: Yup.string().required("Warehouse Code is required"),
            warehouse_name: Yup.string().required("Warehouse Name is required"),
            item_code: Yup.string().required("Item Code is required"),
            item_name: Yup.string().required("Item Name is required"),
            batch: Yup.string().required("Batch is required"),
            source: Yup.string().required("Source is required"),
            quantity: Yup.string().required("Quantity is required"),
            uom: Yup.string().required("UOM is required"),
            remark: Yup.string().required("Remark is required"),
            created_by: Yup.string().required("Created By is required"),
            specification: Yup.string().required("Specification is required"),
        })
    ),
});
