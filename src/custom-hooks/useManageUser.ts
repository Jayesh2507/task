import { IUser } from "../types/user";
import APiCallService from "../axios/APICallService";
import { DELETE, POST, PUT } from "../constants/constants";

const useManageUser = () => {
  const addUser = async (data: IUser) => {
    const response = await APiCallService(POST, "/users", data);
    return response;
  };

  const editUser = async (id: string, data: IUser) => {
    const response = await APiCallService(PUT, `/users/${id}`, data);
    return response;
  };

  const deleteUser = async (id: string) => {
    const response = await APiCallService(DELETE, `/users/${id}`);
    return response;
  };

  return { addUser, editUser, deleteUser };
};

export default useManageUser;
