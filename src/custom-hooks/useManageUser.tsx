// hooks/useManageUser.ts
import axios from "axios";
import { toast } from "react-toastify";
import { IUser, IUserFormInputs } from "../types";
import { BASE_URL } from "../constants";

const useManageUser = () => {
  const addUser = async (data: IUserFormInputs) => {
    try {
      const response = await axios.post(`${BASE_URL}/users`, data);
      return response.data;
    } catch (err: any) {
      toast.error(`Failed to add user: ${err.message}`);
    }
  };

  const editUser = async (id: string, data: IUser) => {
    try {
      const response = await axios.put(`${BASE_URL}/users/${id}`, data);
      return response.data;
    } catch (err: any) {
      toast.error(`Failed to edit user: ${err.message}`);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await axios.delete(`${BASE_URL}/users/${id}`);
      return response.data;
    } catch (err: any) {
      toast.error(`Failed to delete user: ${err.message}`);
    }
  };

  return { addUser, editUser, deleteUser };
};

export default useManageUser;
