export type IUserRole = "Admin" | "User" | "Viewer";

export interface IUser {
  id: string;
  name: string;
  email: string;
  age: number;
  role: IUserRole;
}

export interface IUserFormInputs {
  name: string;
  email: string;
  age: number;
  role: IUserRole;
}
