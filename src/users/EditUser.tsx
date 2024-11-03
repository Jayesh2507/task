import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Box,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { IUser, IUserRole } from "../types";

const roles: IUserRole[] = ["Admin", "User", "Viewer"];

interface EditUserDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IUser) => Promise<void>;
  userData: IUser;
}

const EditUser: React.FC<EditUserDialogProps> = ({
  open,
  onClose,
  onSubmit,
  userData,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: userData,
  });

  const handleFormSubmit = async (data: IUser) => {
    const formattedData: IUser = {
      ...data,
      age: Number(data.age),
      role: data.role as IUserRole,
    };
    setLoading(true);
    await onSubmit(formattedData);
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Edit User</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: "Name is required", minLength: 3 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="standard"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={
                  errors.name ? "Name must be at least 3 characters" : ""
                }
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                message: "Enter a valid email",
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                variant="standard"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            )}
          />
          <Controller
            name="age"
            control={control}
            rules={{
              required: "Age is required",
              min: { value: 18, message: "Must be at least 18" },
              max: { value: 65, message: "Must be 65 or younger" },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Age"
                type="number"
                variant="standard"
                fullWidth
                margin="normal"
                error={!!errors.age}
                helperText={errors.age ? errors.age.message : ""}
              />
            )}
          />
          <Controller
            name="role"
            control={control}
            rules={{ required: "Role is required" }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Role"
                variant="standard"
                fullWidth
                margin="normal"
                error={!!errors.role}
                helperText={errors.role ? "Role is required" : ""}
              >
                {roles.map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit(handleFormSubmit)}
          color="primary"
          variant="contained"
          disabled={loading}
        >
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUser;
