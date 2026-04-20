import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from "@mui/material";

interface DeleteConfirmationDialogProps {
  open: boolean;
  onClose: () => void;
  onConfirmDelete: () => void;
}

export const DeleteConfirmationDialog = ({
  open,
  onClose,
  onConfirmDelete,
}: DeleteConfirmationDialogProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight={700} sx={{ color: "#ef4444" }}>
          Confirm Deletion
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="body2" color="text.secondary">
          This action is permanent. The employee record will be removed and cannot be recovered.
        </Typography>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 3, gap: 1 }}>
        <Button onClick={onClose} variant="outlined" color="primary" sx={{ flex: 1 }}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirmDelete}
          sx={{
            flex: 1,
            background: "linear-gradient(135deg, #dc2626, #ef4444)",
            color: "#fff",
            boxShadow: "0 4px 14px rgba(220,38,38,0.35)",
            "&:hover": { background: "linear-gradient(135deg, #b91c1c, #dc2626)" },
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};