import axios, { AxiosError } from "axios";
import { toast } from "react-toastify";
import { BASE_URL } from "../constants/constants";

interface IErrorResponse {
  message: string;
  status: number;
}

const APICallService = async (
  method: "get" | "post" | "put" | "delete",
  url: string,
  data?: any
) => {
  try {
    const response = await axios({
      method,
      url: `${BASE_URL}${url}`,
      ...(data && { data }),
    });
    return response.data ? response.data : 1;
  } catch (error) {
    console.log("error", error);
    const err = error as AxiosError<IErrorResponse>;
    const errorMessage = err.response?.data?.message || "An error occurred";
    toast.error(`Request failed: ${errorMessage}`);
    return 0;
  }
};

export default APICallService;
