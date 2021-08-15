import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@material-ui/core/Avatar';
import useStyles from './styles';
import { AxiosRequestConfig } from 'axios';
import useHttpClient from '../../hooks/http-hook';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/index';
import { userActions } from '../../store/user';

type PropsType = {
  open: boolean;
  id: string;
  onClose: () => void;
};

export default function ReplyRequestModal(props: PropsType) {
  const [open, setOpen] = useState(false);
  const { makeRequest } = useHttpClient();
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [senderId, setSenderId] = useState('');
  const classes = useStyles();
  const id = useSelector((state: RootState) => state.user.id);
  const dispatch = useDispatch();

  useEffect(() => {
    if (props.id) fetchUser(props.id);
    setOpen(props.open);
  });

  const fetchUser = async (id: string) => {
    const options: AxiosRequestConfig = {
      url: `/user/${id}`,
      method: 'get',
    };
    const user = await makeRequest(options);
    setUsername(user.username);
    setImage(user.image);
    setSenderId(props.id);
  };

  const handleClose = () => {
    props.onClose();
    setOpen(false);
  };

  const respondFriendRequest = async (response: string) => {
    await makeRequest({
      url: `/user/${id}/respondFriendRequest`,
      method: 'post',
      data: { senderId, response },
      toastMessage: 'Responsed successfully!',
    });
    if (response === 'accept')
      dispatch(
        userActions.addFriend({
          user: {
            id: senderId,
            username,
          },
        }),
      );
    handleClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Friend Request</DialogTitle>
        <DialogContent>
          <div className={classes.avatarWrapper}>
            <Avatar className={classes.large} src={image} />
          </div>
          <DialogContentText id="alert-dialog-description">
            Accept <b>{username}</b> friend request!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => respondFriendRequest('deny')} color="secondary">
            Deny
          </Button>
          <Button onClick={() => respondFriendRequest('accept')} color="primary" autoFocus>
            Accept
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
