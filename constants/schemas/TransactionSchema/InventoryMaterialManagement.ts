import * as Yup from "yup";

export const CreateInitialStockSchema = Yup.object().shape({
    document_date: Yup.string().required("Document date is required"),
    warehouse_name: Yup.string().required("Warehouse is required"),
    warehouse_code: Yup.string().required("Warehouse Code is required"),
    currency_name: Yup.string().required("Currency is required"),
    currency_code: Yup.string().required("Currency Code is required"),
    rate: Yup.number()
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : Number(originalValue)
        )
        .required("Rate is required"),
    details: Yup.array(
        Yup.object().shape({
            item_code: Yup.string().required("Item Code is required"),
            item_name: Yup.string().required("Item Name is required"),
            // local_code: Yup.string().required('Local Code is required'),
            quantity: Yup.number().required("Quantity is required"),
            uom: Yup.string().required("UOM is required"),
            price: Yup.number().required("Price is required"),
        })
    ).required("Details is required"),
});

export const EditInitialStockSchema = Yup.object().shape({
    details: Yup.array(
        Yup.object().shape({
            cancel: Yup.boolean().required("Cancel is required"),
        })
    ),
});

export const StockAdjustmentSchema = Yup.object().shape({
    date: Yup.string().required("Document date is required"),
    warehouse_name: Yup.string().required("Warehouse is required"),
    warehouse_code: Yup.string().required("Warehouse Code is required"),
    details: Yup.array(
        Yup.object().shape({
            item_code: Yup.string().required("Item Code is required"),
            batch: Yup.string().required("Item Name is required"),
            stock_system: Yup.number().required("Quantity is required"),
            stock_actual: Yup.number().required("Price is required"),
        })
    ),
});

export const CreateStockMutationSchema = Yup.object().shape({
    document: Yup.string().optional(),
    date: Yup.date().optional(),
    warehouse: Yup.string().optional(),
    warehouse_code: Yup.string().optional(),
    mutated_from: Yup.array(
        Yup.object().shape({
            item_name: Yup.string().optional(),
            batch: Yup.string().optional(),
            stock: Yup.number().optional(),
            quantity: Yup.number().optional(),
            uom: Yup.string().optional(),
        })
    ).optional(),
    mutated_to: Yup.array(
        Yup.object().shape({
            item_name: Yup.string().optional(),
            batch: Yup.string().optional(),
            quantity: Yup.number().optional(),
            uom: Yup.string().optional(),
        })
    ).optional(),
});

export const EditStockMutationSchema = Yup.object().shape({
    details: Yup.array(
        Yup.object().shape({
            cancel: Yup.boolean().required("Cancel is required"),
            cancel_reason: Yup.boolean().required("Cancel Reason is required"),
        })
    ),
});

export const CreateDirectPurchaseReceiveSchema = Yup.object().shape({
    document_date: Yup.string().optional(),
    department: Yup.string().optional(),
    warehouse_name: Yup.string().optional(),
    warehouse_code: Yup.string().optional(),
    vendor_name: Yup.string().optional(),
    vendor_code: Yup.string().optional(),
    site_code: Yup.string().optional(),
    site_name: Yup.string().optional(),
    term_of_payment: Yup.string().optional(),
    currency_name: Yup.string().optional(),
    currency_code: Yup.string().optional(),
    tax_name: Yup.string().optional(),
    tax_code: Yup.string().optional(),
    details: Yup.array(
        Yup.object().shape({
            item_name: Yup.string().optional(),
            local_code: Yup.string().optional(),
            batch: Yup.string().optional(),
            uom: Yup.string().optional(),
            total: Yup.number()
                .nullable()
                .transform((value, originalValue) =>
                    originalValue === "" ? null : Number(originalValue)
                )
                .optional(),
            remark: Yup.string().optional(),
        })
    ).optional(),
});

export const EditDirectPurchaseReceiveSchema = Yup.object().shape({
    details: Yup.array(
        Yup.object().shape({
            cancel: Yup.boolean().required("Cancel is required"),
            cancel_reason: Yup.boolean().required("Cancel Reason is required"),
        })
    ),
});
