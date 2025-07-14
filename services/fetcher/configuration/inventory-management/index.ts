import {
    PATH_ITEMS_UOM,
    PATH_ITEMS_CATEGORY,
    PATH_ITEMS_MASTER,
    PATH_WAREHOUSE,
    PATH_WAREHOUSE_CATEGORY,
} from "@constants/routes";
import axios, { AxiosResponse } from "axios";
import { FetcherOptions } from "../../../../types/client/fetcher";

const getUOM = async (option?: FetcherOptions) => {
    try {
        const res = await axios.get(`${PATH_ITEMS_UOM}`, {
            params: {
                page_size: !option?.all
                    ? option?.pagination?.pageSize
                    : undefined,
                current_page: !option?.all
                    ? option?.pagination?.pageIndex
                    : undefined,
                search: option?.search,
            },
        });

        return res;
    } catch (error) {
        console.error("Error fetching log history:", error);
        throw error;
    }
};

const createUOM = async (body: UOMFormBody) => {
    try {
        const res = await axios.post(PATH_ITEMS_UOM, body);
        return res.data;
    } catch (error) {
        console.error("Error creating country:", error);
        throw error;
    }
};

const editUOM = async (body: UOMFormBody) => {
    try {
        const res = await axios.put(`${PATH_ITEMS_UOM}/${body.uom_code}`, body);
        return res.data;
    } catch (error) {
        console.error("Error editing country:", error);
        throw error;
    }
};

const getItemCategory = async (option?: FetcherOptions) => {
    try {
        const res = await axios.get(`${PATH_ITEMS_CATEGORY}`, {
            params: {
                page_size: !option?.all
                    ? option?.pagination?.pageSize
                    : undefined,
                current_page: !option?.all
                    ? option?.pagination?.pageIndex
                    : undefined,
                search: option?.search,
            },
        });

        return res;
    } catch (error) {
        console.error("Error fetching log history:", error);
        throw error;
    }
};

const createItemCategory = async (body: ItemCategoryFormBody) => {
    try {
        const res = await axios.post(PATH_ITEMS_CATEGORY, body);
        console.log("abody", body);
        return res.data;
    } catch (error) {
        console.error("Error creating item category:", error);
        throw error;
    }
};

const editItemCategory = async (body: ItemCategoryFormBody) => {
    try {
        console.log(body);
        const res = await axios.put(
            `${PATH_ITEMS_CATEGORY}/${body.item_category_code}`,
            body
        );
        return res.data;
    } catch (error) {
        console.error("Error editing item category:", error);
        throw error;
    }
};

const getItem = async (option?: FetcherOptions) => {
    try {
        const res = await axios.get(`${PATH_ITEMS_MASTER}`, {
            params: {
                page_size: !option?.all
                    ? option?.pagination?.pageSize
                    : undefined,
                current_page: !option?.all
                    ? option?.pagination?.pageIndex
                    : undefined,
                search: option?.search,
            },
        });

        return res;
    } catch (error) {
        console.error("Error fetching list item : ", error);
        throw error;
    }
};

const getDetailItem = async (
    id: string
): Promise<AxiosResponse<BasicResponse<MasterItemFormBody>>> => {
    const res = await axios.get(`${PATH_ITEMS_MASTER}/${id}`);
    return res;
};

const createItem = async (body: MasterItemFormBody, params?: any) => {
    try {
        const res = await axios.post(PATH_ITEMS_MASTER, body, { params });
        return res.data;
    } catch (error) {
        console.error("Error creating item category:", error);
        throw error;
    }
};

const getWarehouseCategory = async (option?: FetcherOptions) => {
    try {
        const res = await axios.get(`${PATH_WAREHOUSE_CATEGORY}`, {
            params: {
                page_size: !option?.all
                    ? option?.pagination?.pageSize
                    : undefined,
                current_page: !option?.all
                    ? option?.pagination?.pageIndex
                    : undefined,
                search: option?.search,
            },
        });

        return res;
    } catch (error) {
        console.error("Error fetching log history:", error);
        throw error;
    }
};

const createWarehouseCategory = async (body: WarehouseCategoryFormBody) => {
    try {
        const res = await axios.post(PATH_WAREHOUSE_CATEGORY, body);
        return res.data;
    } catch (error) {
        console.error("Error creating country:", error);
        throw error;
    }
};

const editWarehouseCategory = async (body: WarehouseCategoryFormBody) => {
    try {
        const res = await axios.put(
            `${PATH_WAREHOUSE_CATEGORY}/${body.warehouse_category_code}`,
            body
        );
        return res.data;
    } catch (error) {
        console.error("Error editing country:", error);
        throw error;
    }
};

const getWarehouse = async (option?: FetcherOptions) => {
    try {
        const res = await axios.get(`${PATH_WAREHOUSE}`, {
            params: {
                page_size: !option?.all
                    ? option?.pagination?.pageSize
                    : undefined,
                current_page: !option?.all
                    ? option?.pagination?.pageIndex
                    : undefined,
                search: option?.search,
            },
        });

        return res;
    } catch (error) {
        console.error("Error fetching log history:", error);
        throw error;
    }
};

const createWarehouse = async (body: WarehouseFormBody) => {
    try {
        const res = await axios.post(PATH_WAREHOUSE, body);
        return res.data;
    } catch (error) {
        console.error("Error creating Warehouse:", error);
        throw error;
    }
};

const editWarehouse = async (body: WarehouseFormBody) => {
    try {
        // Log the request
        console.log("Editing warehouse:", {
            code: body.warehouse_code,
            body,
        });

        const response = await axios.put(
            `/api/configuration/inventory-management/warehouse-management-system/warehouse/${body.warehouse_code}`,
            body
        );

        return response.data;
    } catch (error: any) {
        console.error("Edit warehouse error:", {
            code: body.warehouse_code,
            error: error.response?.data || error.message,
        });
        throw error;
    }
};

const editItem = async (body: MasterItemFormBody, params?: any) => {
    try {
        const res = await axios.put(
            `${PATH_ITEMS_MASTER}/${body.item_code}`,
            body,
            { params }
        );
        return res.data;
    } catch (error) {
        console.error("Error editing item category:", error);
        throw error;
    }
};

export {
    getUOM,
    createUOM,
    editUOM,
    getItemCategory,
    createItemCategory,
    editItemCategory,
    getItem,
    getDetailItem,
    createItem,
    getWarehouse,
    createWarehouse,
    editWarehouse,
    getWarehouseCategory,
    createWarehouseCategory,
    editWarehouseCategory,
    editItem,
};
