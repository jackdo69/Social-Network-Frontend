import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, InputBase, Menu, MenuItem, Avatar } from '@material-ui/core';
import {
  Menu as MenuIcon,
  NotificationsNone as NotificationsIcon,
  Person as AccountIcon,
  Search as SearchIcon,
  ArrowBack as ArrowBackIcon,
} from '@material-ui/icons';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';

// styles
import useStyles from './styles';

// components
import { Badge, Typography, TColor } from '../Wrappers/Wrappers';
import Toast from '../Toast/Toast';
import ReplyRequestModal from '../ReplyRequestModal/ReplyRequestModal';
import FriendList from '../FriendList/FriendList';

// context
import { useLayoutState, useLayoutDispatch, toggleSidebar } from '../../context/LayoutContext';
import { RouteComponentProps } from 'react-router-dom';

//hooks
import useAuth from '../../hooks/auth-hook';
import { RootState } from '../../store';
import { useSelector } from 'react-redux';

interface Message {
  id: number;
  constiant: TColor;
  name: string;
  message: string;
  time: string;
}

const messages: Array<Message> = [
  {
    id: 0,
    constiant: 'warning',
    name: 'Jane Hew',
    message: 'Hey! How is it going?',
    time: '9:32',
  },
  {
    id: 1,
    constiant: 'success',
    name: 'Lloyd Brown',
    message: 'Check out my new Dashboard',
    time: '9:18',
  },
  {
    id: 2,
    constiant: 'primary',
    name: 'Mark Winstein',
    message: 'I want rearrange the appointment',
    time: '9:15',
  },
  {
    id: 3,
    constiant: 'secondary',
    name: 'Liana Dutti',
    message: 'Good news from sale department',
    time: '9:09',
  },
];

type ElementMenu = (EventTarget & HTMLButtonElement) | null;

export default function Header(props: { history: RouteComponentProps['history'] }) {
  const classes = useStyles();

  // global
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  // local
  const [mailMenu, setMailMenu] = useState<ElementMenu>(null);
  const [isMailsUnread, setIsMailsUnread] = useState(true);
  const [notificationsMenu, setNotificationsMenu] = useState<ElementMenu>(null);
  const [isNotificationsUnread, setIsNotificationsUnread] = useState(true);
  const [profileMenu, setProfileMenu] = useState<ElementMenu>(null);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [requestModalId, setRequestModalId] = useState('');
  const { logout } = useAuth();
  const history = useHistory();
  const image = useSelector((state: RootState) => state.user.image);
  const username = useSelector((state: RootState) => state.user.username);
  const email = useSelector((state: RootState) => state.user.email);
  const notifications = useSelector((state: RootState) => state.user.notifications);

  const signout = () => {
    logout();
    history.push('/login');
  };

  const callRequestModal = (id: string) => {
    setNotificationsMenu(null);
    setOpenRequestModal(true);
    setRequestModalId(id);
  };
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toast />
      <Toolbar className={classes.toolbar}>
        <IconButton
          color="inherit"
          onClick={() => toggleSidebar(layoutDispatch!)}
          className={classNames(classes.headerMenuButtonSandwich, classes.headerMenuButtonCollapse)}
        >
          {layoutState!.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(classes.headerIcon, classes.headerIconCollapse),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(classes.headerIcon, classes.headerIconCollapse),
              }}
            />
          )}
        </IconButton>
        <Typography
          onClick={() => history.push('/app')}
          size="xl"
          variant="h6"
          weight="medium"
          className={classes.logotype}
        >
          Social Network
        </Typography>
        <div className={classes.grow} />
        <div
          className={classNames(classes.search, {
            [classes.searchFocused]: isSearchOpen,
          })}
        >
          <div
            className={classNames(classes.searchIcon, {
              [classes.searchIconOpened]: isSearchOpen,
            })}
            onClick={() => setSearchOpen(!isSearchOpen)}
          >
            <SearchIcon classes={{ root: classes.headerIcon }} />
          </div>
          <InputBase
            placeholder="Search…"
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={(e) => {
            setNotificationsMenu(e.currentTarget);
            setIsNotificationsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge badgeContent={isNotificationsUnread && notifications ? notifications.length : null} color="warning">
            <NotificationsIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          color="inherit"
          aria-haspopup="true"
          aria-controls="mail-menu"
          onClick={(e) => {
            setMailMenu(e.currentTarget);
            setIsMailsUnread(false);
          }}
          className={classes.headerMenuButton}
        >
          <Badge badgeContent={isMailsUnread ? messages.length : null} color="secondary">
            <QuestionAnswerIcon classes={{ root: classes.headerIcon }} />
          </Badge>
        </IconButton>
        <IconButton
          aria-haspopup="true"
          color="inherit"
          className={classes.headerMenuButton}
          aria-controls="profile-menu"
          onClick={(e) => setProfileMenu(e.currentTarget)}
        >
          <Avatar alt="User picture" src={image} />
        </IconButton>
        <Menu
          id="mail-menu"
          open={Boolean(mailMenu)}
          anchorEl={mailMenu}
          onClose={() => setMailMenu(null)}
          MenuListProps={{ className: classes.headerMenuList }}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <FriendList close={() => setMailMenu(null)} />
        </Menu>
        <Menu
          id="notifications-menu"
          open={Boolean(notificationsMenu)}
          anchorEl={notificationsMenu}
          onClose={() => setNotificationsMenu(null)}
          className={classes.headerMenu}
          disableAutoFocusItem
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
        <Menu
          id="profile-menu"
          open={Boolean(profileMenu)}
          anchorEl={profileMenu}
          onClose={() => setProfileMenu(null)}
          className={classes.headerMenu}
          classes={{ paper: classes.profileMenu }}
          disableAutoFocusItem
        >
          <div className={classes.profileMenuUser}>
            <Typography variant="h4" weight="medium">
              {username}
            </Typography>
            <Typography className={classes.profileMenuLink} component="a" color="primary" href="https://flatlogic.com">
              {email}
            </Typography>
          </div>
          <MenuItem className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
            <AccountIcon className={classes.profileMenuIcon} /> Profile
          </MenuItem>
          <MenuItem className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
            <AccountIcon className={classes.profileMenuIcon} /> Tasks
          </MenuItem>
          <MenuItem className={classNames(classes.profileMenuItem, classes.headerMenuItem)}>
            <AccountIcon className={classes.profileMenuIcon} /> Messages
          </MenuItem>
          <div className={classes.profileMenuUser}>
            <Typography className={classes.profileMenuLink} color="primary" onClick={signout}>
              Sign Out
            </Typography>
          </div>
        </Menu>
      </Toolbar>
      <ReplyRequestModal id={requestModalId} open={openRequestModal} onClose={() => setOpenRequestModal(false)} />
    </AppBar>
  );
}
