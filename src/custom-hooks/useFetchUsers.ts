import APICallService from "../axios/APICallService";
import { GET } from "../constants/constants";

export const useFetchUsers = async () => {
  const response = await APICallService(GET, "/users");
  return response;
};
