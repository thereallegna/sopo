import axios from "axios";
import { PATH_DASHBOARD } from "@constants/routes";

interface DashboardResponse {
    initialStockCount: number;
    stockAdjustmentCount: number;
    stockMutationCount: number;
    directPurchaseReceiveCount: number;
}

export const getDashboard = async (): Promise<DashboardResponse> => {
    try {
        const response = await axios.get(`${PATH_DASHBOARD}`);
        console.log("Dashboard response:", response.data); // Add logging to debug

        return {
            initialStockCount: response.data.data.initial_stock_count,
            stockAdjustmentCount: response.data.data.stock_adjustment_count,
            stockMutationCount: response.data.data.stock_mutation_count,
            directPurchaseReceiveCount:
                response.data.data.direct_purchase_receive_count,
        };
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
};
