import * as Yup from "yup";

export const UOMSchema = Yup.object().shape({
    uom_code: Yup.string().required("Country code is required"), // Corrected typo here
    uom_name: Yup.string().required("Country name is required"),
});

export const ItemCategorySchema = Yup.object().shape({
    item_category_code: Yup.string().required("Category MM code is required"),
    item_category_name: Yup.string().required("Category MM name is required"),
    active: Yup.boolean().required("Active is required"),
});

export const CreateMasterItemMMSchema = Yup.object().shape({
    item_name: Yup.string().required("Item name is required"),
    category_name: Yup.string().required("Category is required"),
    category_code: Yup.string().required("Category is required"),
    uom_name: Yup.string().required("UoM is required"),
    uom_code: Yup.string().required("UoM is required"),
    active: Yup.boolean().required("Active is required"),
});

export const EditMasterItemMMSchema = Yup.object().shape({
    item_name: Yup.string().required("Item name is required"),
    active: Yup.boolean().required("Active is required"),
});

export const WarehouseCategorySchema = Yup.object().shape({
    warehouse_category_code: Yup.string().required(
        "Warehouse category code is required"
    ),
    warehouse_category_name: Yup.string().required(
        "Warehouse category name is required"
    ),
});

export const WarehouseSchema = Yup.object().shape({
    warehouse_code: Yup.string().required("Warehouse code is required"),
    warehouse_name: Yup.string().required("Warehouse name is required"),
    warehouse_category_name: Yup.string().required(
        "Warehouse category is required"
    ),
    warehouse_category_code: Yup.string().required(
        "Warehouse category is required"
    ),
    city_name: Yup.string().required("City name is required"),
    city_code: Yup.string().required("City code is required"),
    postal_code: Yup.number()
        .nullable()
        .transform((value, originalValue) =>
            originalValue === "" ? null : Number(originalValue)
        )
        .test("length", "Kode pos harus 5 digit", (value) => {
            if (!value) return true; // Allow empty/null value
            return value.toString().length === 5;
        }),

    phone: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .test("numeric", "Phone number must contain only numbers", (val) => {
            if (!val) return true; // Skip validation if empty/null
            return /^\d+$/.test(val);
        })
        .test("len", "Phone number must be between 10-13 characters", (val) => {
            if (!val) return true; // Skip validation if empty/null
            return val.length >= 10 && val.length <= 13;
        }),

    fax: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .test("numeric", "Fax number must contain only numbers", (val) => {
            if (!val) return true; // Skip validation if empty/null
            return /^\d+$/.test(val);
        })
        .test("len", "Fax number must be between 10-13 characters", (val) => {
            if (!val) return true; // Skip validation if empty/null
            return val.length >= 10 && val.length <= 13;
        }),

    mobile: Yup.string()
        .nullable()
        .transform((value) => (value === "" ? null : value))
        .test("numeric", "Mobile number must contain only numbers", (val) => {
            if (!val) return true; // Skip validation if empty/null
            return /^\d+$/.test(val);
        })
        .test(
            "len",
            "Mobile number must be between 10-13 characters",
            (val) => {
                if (!val) return true; // Skip validation if empty/null
                return val.length >= 10 && val.length <= 13;
            }
        ),
});
