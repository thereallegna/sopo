import axios from "axios";

// Function to fetch user session data
export const fetchUserSession = async (): Promise<UserData> => {
    const { data } = await axios.get<UserData>(`/api/user`);
    return data;
};
