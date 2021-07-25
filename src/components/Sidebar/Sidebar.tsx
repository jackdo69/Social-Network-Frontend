import React, { useState, useEffect } from 'react';
import { Drawer, IconButton, List, SvgIconTypeMap } from '@material-ui/core';
import { Home, AccountCircle, Face, Work, ArrowBack as ArrowBackIcon, SportsEsports, Store } from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import classNames from 'classnames';

// styles
import useStyles from './styles';

// components
import SidebarLink from './components/SidebarLink/SidebarLink';

// context
import { useLayoutState, useLayoutDispatch, toggleSidebar } from '../../context/LayoutContext';
import { OverridableComponent } from '@material-ui/core/OverridableComponent';

const structure = [
  { id: 1, label: 'Home', link: '/app/home', icon: <Home /> },
  { id: 2, label: 'User', link: '/app/user', icon: <AccountCircle /> },
  { id: 3, label: 'Friends', link: '/app/friends', icon: <Face /> },
  { id: 4, label: 'Jobs', icon: <Work /> },
  { id: 5, label: 'Games', icon: <SportsEsports /> },
  { id: 6, label: 'Marketplace', icon: <Store /> },
];

function Sidebar({ location }: { location: RouteComponentProps['location'] }) {
  const classes = useStyles();
  const theme = useTheme();

  // global
  const layoutState = useLayoutState();
  const layoutDispatch = useLayoutDispatch();

  // local
  const [isPermanent, setPermanent] = useState(true);

  useEffect(function () {
    window.addEventListener('resize', handleWindowWidthChange);
    handleWindowWidthChange();
    return function cleanup() {
      window.removeEventListener('resize', handleWindowWidthChange);
    };
  });

  return (
    <Drawer
      variant={isPermanent ? 'permanent' : 'temporary'}
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: layoutState!.isSidebarOpened,
        [classes.drawerClose]: !layoutState!.isSidebarOpened,
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: layoutState!.isSidebarOpened,
          [classes.drawerClose]: !layoutState!.isSidebarOpened,
        }),
      }}
      open={layoutState!.isSidebarOpened}
    >
      <div className={classes.toolbar} />
      <div className={classes.mobileBackButton}>
        <IconButton onClick={() => toggleSidebar(layoutDispatch!)}>
          <ArrowBackIcon classes={{ root: classNames(classes.headerIcon, classes.headerIconCollapse) }} />
        </IconButton>
      </div>
      <List className={classes.sidebarList}>
        {structure.map((link) => (
          /* eslint-disable-next-line */
          // @ts-ignore
          <SidebarLink key={link.id} location={location} isSidebarOpened={layoutState!.isSidebarOpened} {...link} />
        ))}
      </List>
    </Drawer>
  );

  // ##################################################################
  function handleWindowWidthChange() {
    const windowWidth = window.innerWidth;
    const breakpointWidth = 960;
    const isSmallScreen = windowWidth < breakpointWidth;

    if (isSmallScreen && isPermanent) {
      setPermanent(false);
    } else if (!isSmallScreen && !isPermanent) {
      setPermanent(true);
    }
  }
}

export default withRouter(Sidebar);
