import React from 'react';
import { Route, Switch, withRouter, RouteComponentProps } from 'react-router-dom';
import classnames from 'classnames';
import { Box, IconButton, Link } from '@material-ui/core';
import Icon from '@mdi/react';

//icons
import { mdiFacebook as FacebookIcon, mdiTwitter as TwitterIcon, mdiGithub as GithubIcon } from '@mdi/js';

// styles
import useStyles from './styles';

// components
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import Loading from '../../components/Loading/Loading';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import useForm from '../../hooks/form-hook';

// pages
import Home from '../../pages/home/Home';
import User from '../../pages/user/User';
import Friends from '../../pages/friends/Friends';

// context
import { useLayoutState } from '../../context/LayoutContext';

function Layout(props: { history: RouteComponentProps['history'] }) {
  const classes = useStyles();
  const { Form, openForm } = useForm();
  // global
  const layoutState = useLayoutState();

  return (
    <div className={classes.root}>
      <>
        <Loading />
        {/* <Toast /> */}
        <Header history={props.history} />
        <Sidebar />
        {Form}
        <Fab className={classes.fab} color="primary" aria-label="add" onClick={() => openForm({ action: 'addPost' })}>
          <AddIcon />
        </Fab>
        <div
          className={classnames(classes.content, {
            [classes.contentShift]: layoutState!.isSidebarOpened,
          })}
        >
          <div className={classes.fakeToolbar} />
          <Switch>
            <Route path="/app/home" component={Home} />
            <Route path="/app/user" component={User} />
            <Route path="/app/friends" component={Friends} />
          </Switch>
          <Box mt={5} width={'100%'} display={'flex'} alignItems={'center'} justifyContent="space-between">
            <div>
              <Link color={'primary'} href={'#'} className={classes.link}>
                Home
              </Link>
              <Link color={'primary'} href={'#'} className={classes.link}>
                About
              </Link>
              <Link color={'primary'} href={'#'} className={classes.link}>
                Blog
              </Link>
            </div>
            <div>
              <Link href={'#'}>
                <IconButton aria-label="facebook">
                  <Icon path={FacebookIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={'#'}>
                <IconButton aria-label="twitter">
                  <Icon path={TwitterIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
              <Link href={'#'}>
                <IconButton aria-label="github" style={{ marginRight: -12 }}>
                  <Icon path={GithubIcon} size={1} color="#6E6E6E99" />
                </IconButton>
              </Link>
            </div>
          </Box>
        </div>
      </>
    </div>
  );
}

export default withRouter(Layout);
