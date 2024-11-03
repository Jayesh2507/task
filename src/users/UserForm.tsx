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
import { IUser, IUserRole } from "../types/user";
import { USER_ROLES, VALIDATION_MSGS } from "../constants/constants";

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: IUser) => Promise<void>;
  user?: IUser;
}

const UserForm: React.FC<UserFormDialogProps> = ({
  open,
  onClose,
  onSubmit,
  user,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      age: user?.age || "",
      role: user?.role || "",
    },
  });

  const handleFormSubmit = async (data: {
    name: string;
    email: string;
    age: string | number;
    role: string;
  }) => {
    const formattedData: IUser = {
      ...data,
      age: Number(data.age),
      role: data.role as IUserRole,
      id: user?.id,
    };
    setLoading(true);
    await onSubmit(formattedData);
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{user ? "Edit User" : "Add User"}</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: VALIDATION_MSGS.nameRequired, minLength: 3 }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Name"
                variant="standard"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name ? VALIDATION_MSGS.invalidName : ""}
              />
            )}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              required: VALIDATION_MSGS.emailRequired,
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
              required: VALIDATION_MSGS.ageRequired,
              min: { value: 18, message: VALIDATION_MSGS.minAge },
              max: { value: 65, message: VALIDATION_MSGS.maxAge },
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
            rules={{ required: VALIDATION_MSGS.roleRequired }}
            render={({ field }) => (
              <TextField
                {...field}
                select
                label="Role"
                variant="standard"
                fullWidth
                margin="normal"
                error={!!errors.role}
                helperText={errors.role ? VALIDATION_MSGS.roleRequired : ""}
              >
                {USER_ROLES.map((role: string) => (
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
          {user ? "Save Changes" : "Add User"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
