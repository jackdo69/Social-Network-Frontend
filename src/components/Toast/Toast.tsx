import React from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import useStyles from './styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { toastActions } from '../../store/toast';

export default function Toast() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const message = useSelector((state: RootState) => state.toast.message);
  const severity = useSelector((state: RootState) => state.toast.severity);
  const show = useSelector((state: RootState) => state.toast.show);

  const handleClose = () => {
    dispatch(toastActions.closeToast());
  };

  return (
    <div className={classes.root}>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={show}
        autoHideDuration={4000}
        onClose={handleClose}
      >
        <MuiAlert elevation={6} variant="filled" onClose={handleClose} severity={severity}>
          {message}
        </MuiAlert>
      </Snackbar>
    </div>
  );
}
