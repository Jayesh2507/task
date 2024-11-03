import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useEffect, useState } from "react";
import { ColDef } from "ag-grid-community";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import UserForm from "./UserForm";
import { useFetchUsers } from "../custom-hooks/useFetchUsers";
import useManageUser from "../custom-hooks/useManageUser";
import { IUser } from "../types/user";
import { toast } from "react-toastify";
import DeleteUser from "./DeleteUser";

const AllUsers = () => {
  const { addUser, deleteUser, editUser } = useManageUser();
  const [openAddDialog, setOpenAddDialog] = useState<boolean>(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const [openEditDialog, setOpenEditDialog] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<IUser>({
    id: "",
    name: "",
    email: "",
    age: 18,
    role: "User",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [rowData, setRowData] = useState<IUser[]>([]);
  const [colDefs, setColDefs] = useState<ColDef[]>([
    { field: "id", hide: true },
    { field: "name", sortable: true, filter: true, width: 350 },
    { field: "email", sortable: true, filter: true, width: 400 },
    { field: "age", sortable: false, width: 200 },
    { field: "role", sortable: true, filter: true, width: 300 },
    {
      field: "Action",
      sortable: false,
      width: 250,
      cellRenderer: (params: any) => {
        const handleEdit = () => {
          handleOpenEditDialog(params.data);
        };

        const handleDelete = () => {
          handleOpenDeleteDialog(params.data);
        };

        return (
          <div>
            <IconButton onClick={handleEdit} aria-label="edit" color="primary">
              <EditIcon />
            </IconButton>
            <IconButton
              onClick={handleDelete}
              aria-label="delete"
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </div>
        );
      },
    },
  ]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    const data = await useFetchUsers();
    setRowData(data);
    setLoading(false);
  };

  const handleOpenAddDialog = () => {
    setOpenAddDialog(true);
  };

  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
  };

  const handleOpenEditDialog = (data: IUser) => {
    setSelectedUser(data);
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleOpenDeleteDialog = (data: IUser) => {
    setSelectedUser(data);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  const handleAddUser = async (data: IUser) => {
    const response = await addUser(data);
    if (response) {
      toast.success("User added successfully");
      handleCloseAddDialog();
      fetchUsers();
    }
  };

  const handleEditUser = async (data: IUser) => {
    console.log("data", data);
    if (data.id) {
      const response = await editUser(data?.id, data);
      if (response) {
        toast.success("User edited successfully");
        handleCloseEditDialog();
        fetchUsers();
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    const response = await deleteUser(id);
    if (response) {
      toast.success("User deleted successfully.");
      handleCloseDeleteDialog();
      fetchUsers();
    }
  };

  return (
    <>
      {openAddDialog && (
        <UserForm
          open={openAddDialog}
          onClose={handleCloseAddDialog}
          onSubmit={handleAddUser}
        />
      )}

      {selectedUser && openEditDialog && (
        <UserForm
          user={selectedUser}
          open={openEditDialog}
          onClose={handleCloseEditDialog}
          onSubmit={handleEditUser}
        />
      )}

      {selectedUser && selectedUser.id && openDeleteDialog && (
        <DeleteUser
          id={selectedUser.id}
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          onDelete={handleDeleteUser}
        />
      )}
      <div>
        <div className="title">
          <h1>All Users</h1>
          <Button variant="contained" onClick={handleOpenAddDialog}>
            Add User
          </Button>
        </div>
        <div
          className="ag-theme-quartz"
          style={{
            height: 500,
          }}
        >
          <AgGridReact
            loading={loading}
            rowData={rowData}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10, 20, 50, 100]}
          />
        </div>
      </div>
    </>
  );
};

export default AllUsers;
