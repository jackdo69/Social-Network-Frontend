import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import UploadImage from "../UploadImage/UploadImage";
import useHttpClient from "../../hooks/http-hook";
import useLoading from "../Loading/Loading";

//Redux area
import { useDispatch } from 'react-redux';
import { postActions } from '../../store/post'

const usePostForm = () => {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [image, setImage] = React.useState("");
  const { makeRequest } = useHttpClient();
  const { closeLoading, setLoading } = useLoading();
  const openForm = () => {
    setOpen(true);
  };

  const dispatch = useDispatch();

  const handleSubmit = async () => {

    const user = "Duc Anh";
    try {
      setLoading();
      const res = await makeRequest({
        url: "/post",
        method: "post",
        data: { title, content, image, user },
      });
      dispatch(postActions.addPost({
        post: res.result
      }))
      closeLoading();
    } catch (err) {
      console.log(err);
    }
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
}

export default usePostForm;
