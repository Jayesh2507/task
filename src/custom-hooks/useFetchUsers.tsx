import axios from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants";

export const useFetchUsers = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/users`);
    return response.data;
  } catch (err: any) {
    toast.error(`Failed to fetch users: ${err.message}`);
    return [];
  }
};
