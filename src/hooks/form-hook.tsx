import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import UploadImage from '../components/UploadImage/UploadImage';
import useHttpClient from './http-hook';

//Redux area
import { useDispatch } from 'react-redux';
import { postActions } from '../store/post';
import { loadingActions } from '../store/loading';
import { userActions } from '../store/user';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

import { FormParams } from '../interfaces';

const useForm = () => {
  const [open, setOpen] = useState(false);
  const [showDialogContent, setShowDialogContent] = useState(false);
  const [showUploadImage, setShowUploadImage] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState('');
  const [id, setId] = useState('');
  const [action, setAction] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formButton, setFormButton] = useState('');
  const dispatch = useDispatch();
  const { makeRequest } = useHttpClient();
  const username = useSelector((state: RootState) => state.user.username);
  const userId = useSelector((state: RootState) => state.user.id);

  const openForm = (params: FormParams) => {
    setOpen(true);
    setAction(params.action);
    switch (params.action) {
      case 'addPost':
        setFormTitle('Add Post');
        setFormButton('Add');
        setShowDialogContent(true);
        setShowUploadImage(true);
        break;

      case 'updatePost':
        setFormTitle('Update Post');
        setFormButton('Update');
        setShowDialogContent(true);
        break;

      case 'updatePicture':
        setFormTitle('Update Picture');
        setFormButton('Update');
        setShowUploadImage(true);
        break;
    }
    if (params.payload) {
      const post = params.payload;
      setContent(post.content);
      setTitle(post.title);
      setImage(post.image);
      setId(post.id);
    }
  };

  const addPost = async () => {
    const res = await makeRequest({
      url: '/post',
      method: 'post',
      data: {
        title,
        content,
        image,
        user: {
          id: userId,
          username: username,
        },
      },
      toastMessage: 'Post added successfully!',
    });
    dispatch(
      postActions.addPost({
        post: res.result,
      }),
    );

    setContent('');
    setTitle('');
    setImage('');
  };

  const updatePost = async () => {
    await makeRequest({
      url: `/post/${id}`,
      method: 'put',
      data: { title, content },
      toastMessage: 'Post updated successfully!',
    });
    dispatch(
      postActions.updatePost({
        id,
        title,
        content,
      }),
    );
    setContent('');
    setTitle('');
    setImage('');
  };

  const updatePicture = async () => {
    await makeRequest({
      url: `/user/${userId}/updateImage`,
      method: 'put',
      data: { image },
      toastMessage: 'Image updated successfully!',
    });

    dispatch(userActions.setImage({ image }));
  };

  const handleSubmit = async () => {
    dispatch(loadingActions.setLoading({ status: true }));
    switch (action) {
      case 'addPost':
        await addPost();
        break;

      case 'updatePost':
        await updatePost();
        break;

      case 'updatePicture':
        await updatePicture();
        break;
    }
    dispatch(loadingActions.setLoading({ status: false }));
    setOpen(false);
  };

  const Form = (
    <div>
      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{formTitle}</DialogTitle>
        {showDialogContent && (
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
          </DialogContent>
        )}
        {showUploadImage && <UploadImage setImage={setImage} />}

        <DialogActions>
          <Button onClick={() => setOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            {formButton}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );

  return { Form, openForm };
};

export default useForm;
