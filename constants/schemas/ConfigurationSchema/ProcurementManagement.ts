import * as Yup from "yup";

export const VendorCategorySchema = Yup.object().shape({
    vendor_category_code: Yup.string().required(
        "Vendor category code is required"
    ),
    vendor_category_name: Yup.string().required(
        "Vendor category name is required"
    ),
});

export const VendorSchema = Yup.object().shape({
    vendor_code: Yup.string().required("Vendor code is required"),
    vendor_name: Yup.string().required("Vendor name is required"),
    vendor_category: Yup.string().required("Vendor category is required"),
    vendor_category_code: Yup.string().required(
        "Vendor category code is required"
    ),
    address: Yup.string().required("Address is required"),
    city: Yup.string().optional().nullable(),
    postal_code: Yup.string().optional().nullable(),
    website: Yup.string().optional().nullable(),
    head_office: Yup.string().optional().nullable(),
    phone: Yup.string().optional().nullable(),
    mobile: Yup.string().optional().nullable(),
    email: Yup.string().optional().nullable(),
    remark: Yup.string().optional().nullable(),
});
