import axios from "axios";
import { PATH_AUTH_RESET_PASSWORD } from "@constants/routes";

export const resetPassword = async ({
    token,
    ...payload
}: { token: string } & ResetPasswordBody) => {
    const res = await axios.post(
        `${PATH_AUTH_RESET_PASSWORD}/${token}`,
        payload
    );
    return res;
};
