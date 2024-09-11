import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from "@mui/material";

export const ApiKeyDialog = ({
  open,
  onClose,
  onConfirm,
  title,
  description,
}: {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{description}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
        No
      </Button>
      <Button onClick={onConfirm} color="secondary">
        Yes
      </Button>
    </DialogActions>
  </Dialog>
);
