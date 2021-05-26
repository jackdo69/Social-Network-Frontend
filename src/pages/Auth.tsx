import { useState } from 'react';
import { makeStyles } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing(2),

    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '300px',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(2),
    },
  },
}));

const Auth = () => {
  const classes = useStyles();
  // create state variables for each input
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(true);
  const [isLogin, setIsLogin] = useState(true);

  const closeModal = () => { };
  const handleSubmit = () => { };
  return (
    <Dialog open={open} onClose={closeModal}>
      <DialogTitle id="form-dialog-title">Register</DialogTitle>
      <form className={classes.root} onSubmit={handleSubmit}>
        <TextField
          label="Username"
          variant="filled"
          required
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          label="Email"
          variant="filled"
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          variant="filled"
          type="password"
          required
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div>
          <Button variant="contained" onClick={closeModal}>
            Cancel
        </Button>
          <Button type="submit" variant="contained" color="primary">
            Signup
        </Button>
        </div>
      </form>
    </Dialog>
  );
};

export default Auth;
