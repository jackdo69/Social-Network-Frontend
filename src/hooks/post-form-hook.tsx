import { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import UploadImage from "../components/UploadImage";
import useHttpClient from "./http-hook";

//Redux area
import { useDispatch } from 'react-redux';
import { postActions } from '../store/post';
import { loadingActions } from '../store/loading';
import { toastActions } from '../store/toast';

import { FormParams } from '../interfaces';

const usePostForm = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [id, setId] = useState('');
  const [action, setAction] = useState('');
  const dispatch = useDispatch();
  const { makeRequest } = useHttpClient();

  const openForm = (params: FormParams) => {
    setOpen(true);
    setAction(params.action);
    if (params.payload) {
      const post = params.payload;
      setContent(post.content);
      setTitle(post.title);
      setImage(post.image);
      setId(post.id);
    }
  };

  const addPost = async () => {
    const user = "Duc Anh";
    const res = await makeRequest({
      url: "/post",
      method: "post",
      data: { title, content, image, user },
      toastMessage: 'Post added successfully!'
    });
    dispatch(postActions.addPost({
      post: res.result
    }));

    setContent('');
    setTitle('');
    setImage('');
  };

  const updatePost = async () => {
    await makeRequest({
      url: `/post/${id}`,
      method: "put",
      data: { title, content },
      toastMessage: 'Post updated successfully!'
    });
    dispatch(postActions.editPost({
      id, title, content
    }));
    setContent('');
    setTitle('');
    setImage('');
  };

  const handleSubmit = async () => {
    dispatch(loadingActions.setLoading({ status: true }));
    switch (action) {
      case 'add':
        await addPost();
        break;

      case 'edit':
        await updatePost();
        break;
    }
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
        <DialogTitle id="form-dialog-title">{action === 'add' ? 'Add Post' : 'Edit Post'}</DialogTitle>
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
          {action === 'add' && <UploadImage setImage={setImage} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {action === 'add' ? 'Add' : 'Edit'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return { Form, openForm };
};

export default usePostForm;
