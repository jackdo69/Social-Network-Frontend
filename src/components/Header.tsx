import React, { useContext, useState } from 'react';
import { fade, makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import Avatar from '@material-ui/core/Avatar';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import ReplyRequestModal from './ReplyRequestModal';
import { styled } from '@material-ui/core/styles';

import useAuth from '../hooks/auth-hook';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { AuthContext } from '../context/auth-context';

const CustomAppBar = styled(AppBar)({
  background: 'linear-gradient(45deg, #333399 30%, #3939ac 90%)',
  height: 60,
});

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
      minHeight: 36,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    inputRoot: {
      color: 'inherit',
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
    sectionDesktop: {
      display: 'none',
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
    sectionMobile: {
      display: 'flex',
      [theme.breakpoints.up('md')]: {
        display: 'none',
      },
    },
  }),
);

export default function Header() {
  const classes = useStyles();
  const [anchorElProfile, setAnchorElProfile] = useState<null | HTMLElement>(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState<null | HTMLElement>(null);
  const [anchorElMessages, setAnchorElMessages] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();
  const history = useHistory();
  const image = useSelector((state: RootState) => state.user.image);
  const authCtx = useContext(AuthContext);
  const notifications = useSelector((state: RootState) => state.user.notifications);
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [requestModalId, setRequestModalId] = useState('');

  const isMenuProfileOpen = Boolean(anchorElProfile);
  const isMenuNotificationsOpen = Boolean(anchorElNotifications);
  const isMenuMessagesOpen = Boolean(anchorElMessages);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, type: string) => {
    switch (type) {
      case 'profile':
        setAnchorElProfile(event.currentTarget);
        break;
      case 'notifications':
        setAnchorElNotifications(event.currentTarget);
        break;
      case 'messages':
        setAnchorElMessages(event.currentTarget);
        break;
    }
  };

  const handleMenuClose = (type: string) => {
    switch (type) {
      case 'profile':
        setAnchorElProfile(null);
        break;
      case 'notifications':
        setAnchorElNotifications(null);
        break;
      case 'messages':
        setAnchorElMessages(null);
        break;
    }
  };

  const closeRequestModal = () => {
    setOpenRequestModal(false);
  };

  const callRequestModal = (id: string) => {
    setAnchorElNotifications(null);
    setOpenRequestModal(true);
    setRequestModalId(id);
  };

  const signOut = () => {
    logout();
    authCtx.setLoggedIn(false);
    handleMenuClose('profile');
    history.push('/auth');
  };

  const navigateUserPage = () => {
    handleMenuClose('profile');
    history.push('/user');
  };

  const menuProfileId = 'profile-menu';
  const menuNotificationsId = 'notifications-menu';
  const menuMessagesId = 'messages-menu';

  const renderMenuProfile = (
    <Menu
      anchorEl={anchorElProfile}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuProfileId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuProfileOpen}
      onClose={() => handleMenuClose('profile')}
    >
      <MenuItem onClick={navigateUserPage}>Profile</MenuItem>
      <MenuItem onClick={signOut}>Sign out</MenuItem>
    </Menu>
  );

  const renderMenuNotifications = (
    <Menu
      anchorEl={anchorElNotifications}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuNotificationsId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuNotificationsOpen}
      onClose={() => handleMenuClose('notifications')}
    >
      {notifications && notifications.length ? (
        notifications.map((not) => {
          return (
            <MenuItem onClick={() => callRequestModal(not.id)} key={not.id}>
              <b>{not.username}</b> &nbsp; sent you a friend request!
            </MenuItem>
          );
        })
      ) : (
        <MenuItem>No notificatiosn</MenuItem>
      )}
    </Menu>
  );

  const renderMenuMessages = (
    <Menu
      anchorEl={anchorElMessages}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuMessagesId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuMessagesOpen}
      onClose={() => handleMenuClose('messages')}
    >
      <MenuItem>Messages Menu</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <CustomAppBar position="fixed">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer">
            <MenuIcon />
          </IconButton>
          <Button onClick={() => history.push('/home')} color="inherit">
            <h2>Social Network</h2>
          </Button>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={(e) => handleMenuOpen(e, 'messages')} color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton onClick={(e) => handleMenuOpen(e, 'notifications')} color="inherit">
              {notifications && notifications.length ? (
                <Badge badgeContent={notifications.length} color="secondary">
                  <NotificationsIcon />
                </Badge>
              ) : (
                <Badge color="secondary">
                  <NotificationsIcon />
                </Badge>
              )}
            </IconButton>
            <IconButton edge="end" onClick={(e) => handleMenuOpen(e, 'profile')} color="inherit">
              <Avatar alt="User picture" src={image} />
            </IconButton>
          </div>
        </Toolbar>
      </CustomAppBar>
      {renderMenuProfile}
      {renderMenuNotifications}
      {renderMenuMessages}
      <ReplyRequestModal id={requestModalId} open={openRequestModal} onClose={closeRequestModal} />
    </div>
  );
}
