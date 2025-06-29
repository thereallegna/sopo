import { PATH_API } from "@constants/routes";
import axios from "axios";

export const getVersion = async () => {
    const res = await axios.get(PATH_API);
    return res;
};
