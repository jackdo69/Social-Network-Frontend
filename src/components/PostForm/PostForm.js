import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

export default function usePostForm() {
  const [open, setOpen] = React.useState(false);

  const openForm = () => {
    setOpen(true);
  };

  const closeForm = () => {
    setOpen(false);
  };

  const Form = (
    <div>
      <Dialog
        open={open}
        onClose={closeForm}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Post</DialogTitle>
        <DialogContent>
          <TextField
            required
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
          />
          <TextField
            id="content"
            label="content"
            placeholder="Placeholder"
            multiline
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeForm} color="primary">
            Cancel
          </Button>
          <Button onClick={closeForm} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return { Form, openForm, closeForm };
}
