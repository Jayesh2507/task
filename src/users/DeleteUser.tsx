import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface DeleteUserDialogProps {
  id: string;
  open: boolean;
  onClose: () => void;
  onDelete: (id: string) => Promise<void>;
}

const DeleteUser: React.FC<DeleteUserDialogProps> = ({
  id,
  open,
  onClose,
  onDelete,
}) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async () => {
    setLoading(true);
    if (id) {
      await onDelete(id);
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Delete User</DialogTitle>
      <DialogContent>
        <p>Are you sure you want to delete this user?</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button disabled={loading} onClick={handleDelete} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUser;
