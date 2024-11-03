import APiCallService from "../axios/APICallService";
import { GET } from "../constants/constants";

export const useFetchUsers = async () => {
  const response = await APiCallService(GET, "/users");
  return response;
};
