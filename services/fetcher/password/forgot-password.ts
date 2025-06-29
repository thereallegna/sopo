import axios from "axios";
import { PATH_AUTH_FORGOT_PASSWORD } from "@constants/routes";

export const forgotPassword = async ({ email }: ForgotPasswordBody) => {
    try {
        const res = await axios.post(PATH_AUTH_FORGOT_PASSWORD, { email });
        return res;
    } catch (error) {
        console.error("Error sending password reset request:", error);
        throw error;
    }
};
