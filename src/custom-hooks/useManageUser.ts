import { IUser } from "../types/user";
import APICallService from "../axios/APICallService";
import { DELETE, POST, PUT } from "../constants/constants";

const useManageUser = () => {
  const addUser = async (data: IUser) => {
    const response = await APICallService(POST, "/users", data);
    return response;
  };

  const editUser = async (id: string, data: IUser) => {
    const response = await APICallService(PUT, `/users/${id}`, data);
    return response;
  };

  const deleteUser = async (id: string) => {
    const response = await APICallService(DELETE, `/users/${id}`);
    return response;
  };

  return { addUser, editUser, deleteUser };
};

export default useManageUser;
