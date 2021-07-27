import React, { useState } from 'react';
import { Grid, CircularProgress, Tabs, Tab, TextField } from '@material-ui/core';
import { Typography, Button } from '../../components/Wrappers/Wrappers';
import { withRouter } from 'react-router-dom';
import classnames from 'classnames';

// styles
import useStyles from './styles';

// logo
import logo from '../../images/logo.svg';
import google from '../../images/google.svg';

//hooks
import useHttpClient from '../../hooks/http-hook';
import useAuth from '../../hooks/auth-hook';

import { useHistory } from 'react-router-dom';
import { AuthRequestData } from '../../interfaces';

function Login() {
  const classes = useStyles();

  // local
  const [isLoading, setIsLoading] = useState(false);
  const [activeTabId, setActiveTabId] = useState(0);
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const history = useHistory();
  const { makeRequest } = useHttpClient();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoading(true);
    let mode: 'login' | 'register';
    activeTabId === 0 ? (mode = 'login') : (mode = 'register');
    const requestData: AuthRequestData = { username, password };
    if (mode === 'register') {
      requestData.email = email;
    }
    const result = await makeRequest({
      url: `/auth/${mode}`,
      method: 'post',
      data: requestData,
    });
    if (result && result.accessToken && result.refreshToken) {
      const { accessToken, refreshToken } = result;
      login(accessToken, refreshToken);
      history.push('/app/home');
    }
  };

  return (
    <Grid container className={classes.container}>
      <div className={classes.logotypeContainer}>
        <img src={logo} alt="logo" className={classes.logotypeImage} />
        <Typography weight="medium" size="xxxl" className={classes.logotypeText}>
          Social Network
        </Typography>
      </div>
      <div className={classes.formContainer}>
        <div className={classes.form}>
          <Tabs
            value={activeTabId}
            onChange={(e, id) => setActiveTabId(id)}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Login" classes={{ root: classes.tab }} />
            <Tab label="New User" classes={{ root: classes.tab }} />
          </Tabs>
          {activeTabId === 0 && (
            <React.Fragment>
              <Typography constiant="h1" className={classes.greeting}>
                Good Morning, User
              </Typography>
              <Button size="large" className={classes.googleButton}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <TextField
                id="username"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                placeholder="Username"
                type="text"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.formButtons}>
                {isLoading ? (
                  <CircularProgress size={26} className={classes.loginLoader} />
                ) : (
                  <Button
                    disabled={username.length === 0 || password.length === 0}
                    onClick={(e: React.SyntheticEvent) => handleSubmit(e)}
                    constiant="contained"
                    color="primary"
                    size="large"
                  >
                    Login
                  </Button>
                )}
                <Button color="primary" size="large" className={classes.forgetButton}>
                  Forget Password
                </Button>
              </div>
            </React.Fragment>
          )}
          {activeTabId === 1 && (
            <React.Fragment>
              <Typography constiant="h1" className={classes.greeting}>
                Welcome!
              </Typography>
              <Typography constiant="h2" className={classes.subGreeting}>
                Create your account
              </Typography>
              <TextField
                id="email"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                placeholder="Email address"
                type="email"
                fullWidth
              />
              <TextField
                id="username"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                margin="normal"
                placeholder="Username"
                type="text"
                fullWidth
              />
              <TextField
                id="password"
                InputProps={{
                  classes: {
                    underline: classes.textFieldUnderline,
                    input: classes.textField,
                  },
                }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                placeholder="Password"
                type="password"
                fullWidth
              />
              <div className={classes.creatingButtonContainer}>
                {isLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  <Button
                    onClick={(e: React.SyntheticEvent) => handleSubmit(e)}
                    disabled={email.length === 0 || username.length === 0 || password.length === 0}
                    size="large"
                    variant="contained"
                    color="primary"
                    fullWidth
                    className={classes.createAccountButton}
                  >
                    Create your account
                  </Button>
                )}
              </div>
              <div className={classes.formDividerContainer}>
                <div className={classes.formDivider} />
                <Typography className={classes.formDividerWord}>or</Typography>
                <div className={classes.formDivider} />
              </div>
              <Button size="large" className={classnames(classes.googleButton, classes.googleButtonCreating)}>
                <img src={google} alt="google" className={classes.googleIcon} />
                &nbsp;Sign in with Google
              </Button>
            </React.Fragment>
          )}
        </div>
        <Typography color="primary" className={classes.copyright}>
          © {new Date().getFullYear()}{' '}
          <a
            style={{ textDecoration: 'none', color: 'inherit' }}
            href="https://jackdo.me"
            rel="noopener noreferrer"
            target="_blank"
          >
            Jack Do.
          </a>
          All rights reserved.
        </Typography>
      </div>
    </Grid>
  );
}

export default withRouter(Login);
