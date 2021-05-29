import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import UploadImage from "./UploadImage";
import useHttpClient from "../hooks/http-hook";

//Redux area
import { useDispatch } from 'react-redux';
import { postActions } from '../store/post';
import { loadingActions } from '../store/loading';

const usePostForm = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");
  const openForm = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();
  const { makeRequest } = useHttpClient();

  const handleSubmit = async () => {

    const user = "Duc Anh";
    dispatch(loadingActions.setLoading({ status: true }));
    const res = await makeRequest({
      url: "/post",
      method: "post",
      data: { title, content, image, user },
    });
    dispatch(postActions.addPost({
      post: res.result
    }));
    dispatch(loadingActions.setLoading({ status: false }));

    setOpen(false);
  };

  const Form = (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">New Post</DialogTitle>
        <DialogContent>
          <TextField
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            fullWidth
          />
          <TextField
            onChange={(e) => setContent(e.target.value)}
            value={content}
            id="content"
            label="content"
            placeholder="Placeholder"
            multiline
            fullWidth
          />
          <UploadImage setImage={setImage} />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return { Form, openForm };
};

export default usePostForm;
