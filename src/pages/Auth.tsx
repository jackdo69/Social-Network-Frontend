import { useState, useContext } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import useHttpClient from "../hooks/http-hook";
import useAuth from '../hooks/auth-hook';

import { useHistory } from "react-router-dom";
import { AuthRequestData } from '../interfaces';
import { AuthContext } from '../context/auth-context';


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
  switchMode: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '0.3em'
  },
  anchor: {
    color: 'blue',
    textDecoration: 'underline',
    marginLeft: '0.1em',
    cursor: 'pointer'
  }
}));



const Auth = () => {
  const classes = useStyles();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const history = useHistory();
  const { makeRequest } = useHttpClient();
  const authCtx = useContext(AuthContext)

  const closeModal = () => { };
  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    let mode;
    isLogin ? mode = 'login' : mode = 'register';
    let requestData: AuthRequestData = { username, password };
    if (mode === 'register') {
      requestData.email = email;
    }
    const result = await makeRequest({
      url: `/auth/${mode}`,
      method: 'post',
      data: requestData
    });

    if (result && result.accessToken && result.refreshToken) {
      const { accessToken, refreshToken } = result;
      login(accessToken, refreshToken);
      authCtx.setLoggedIn(true)
      history.push("/home");
    }
  };

  return (
    <Dialog open={true} onClose={closeModal}>
      <DialogTitle id="form-dialog-title">{isLogin ? 'Login' : 'Register'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} className={classes.root} >
          <TextField
            label="Username"
            variant="filled"
            required
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          {!isLogin && <TextField
            label="Email"
            variant="filled"
            type="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />}
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
              {isLogin ? 'Login' : 'Register'}
            </Button>
          </div>
        </form>
        <div className={classes.switchMode}>
          <Typography variant={'body1'}>
            {isLogin ? "Haven't got an account yet?" : "Click here to return to login!"}
            <a className={classes.anchor} onClick={() => setIsLogin(!isLogin)}> {isLogin ? ' Register' : ' Login'} </a>
          </Typography>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Auth;
