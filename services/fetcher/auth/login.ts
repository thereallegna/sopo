import axios from "axios";
import { PATH_AUTH_LOGIN } from "@constants/routes";

export const login = async (payload: LoginFormBody) => {
    const res = await axios.post(PATH_AUTH_LOGIN, payload);
    // const res = await axios.post('http://localhost:8000/login', payload);
    return res;
};
