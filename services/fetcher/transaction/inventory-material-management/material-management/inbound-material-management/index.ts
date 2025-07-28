import { PATH_DIRECT_PURCHASE_RECEIVE } from "@constants/routes";
import axios from "axios";
import { replaceSlashes } from "@utils/converter";
import { FetcherOptions } from "../../../../../../types/client/fetcher";

const getDirectPurchaseReceive = async (option?: FetcherOptions) => {
    try {
        const res = await axios.get(`${PATH_DIRECT_PURCHASE_RECEIVE}`, {
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
        console.error("Error getting direct purchase receive:", error);
        throw error;
    }
};

const createDirectPurchaseReceive = async (
    body: DirectPurchaseReceiveFormBody,
    params?: any
) => {
    try {
        const res = await axios.post(PATH_DIRECT_PURCHASE_RECEIVE, body, {
            params,
        });
        return res.data;
    } catch (error) {
        console.error("Error creating direct purchase receive:", error);
        throw error;
    }
};

const editDirectPurchaseReceive = async (
    body: DirectPurchaseReceiveFormBody,
    params?: any
) => {
    try {
        const res = await axios.put(
            `${PATH_DIRECT_PURCHASE_RECEIVE}/${replaceSlashes(
                body.document_number
            )}`,
            body,
            {
                params,
            }
        );
        return res.data;
    } catch (error) {
        console.error("Error editing direct purchase receive:", error);
        throw error;
    }
};

export {
    getDirectPurchaseReceive,
    createDirectPurchaseReceive,
    editDirectPurchaseReceive,
};
