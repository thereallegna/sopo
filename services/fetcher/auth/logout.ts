import axios from "axios";
import { PATH_AUTH_LOGOUT } from "@constants/routes";

export const logout = async () => {
    try {
        const res = await axios.get(PATH_AUTH_LOGOUT);
        return res;
    } catch (error) {
        console.error("Logout failed:", error);
        throw error; // Rethrow the error if needed
    }
};
