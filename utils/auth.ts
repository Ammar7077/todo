import { baseUrl } from "@/settings";
import axios from "axios";

const getUserData = async (accessToken: string) => {
  try {
    const response = await axios.get(`${baseUrl}/auth/refresh`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response.data.user;
  } catch (error) {
    console.error("Error refreshing user data:", error);
    return null;
  }
};
export default getUserData;
