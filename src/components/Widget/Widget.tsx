import React, { useState } from 'react';
import { Paper, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { MoreVert as MoreIcon } from '@material-ui/icons';
import classnames from 'classnames';

// styles
import useStyles from './styles';

interface Props {
  children: Array<React.ReactNode>;
  title?: string;
  noBodyPadding?: boolean;
  bodyClass?: string;
  disableWidgetMenu?: boolean;
  header?: React.ReactNode;
  noHeaderPadding?: boolean;
  headerClass?: string;
  style: Record<string, any>;
  noWidgetShadow?: boolean;
}

export default function Widget({
  children,
  title,
  noBodyPadding,
  bodyClass,
  disableWidgetMenu,
  header,
  noHeaderPadding,
  headerClass,
  style,
  noWidgetShadow,
  ...props
}: Props) {
  const classes = useStyles();

  // local
  const [moreButtonRef, setMoreButtonRef] = useState(null);
  const [isMoreMenuOpen, setMoreMenuOpen] = useState(false);

  return (
    <div className={classes.widgetWrapper} style={style && { ...style }}>
      <Paper
        className={classes.paper}
        classes={{
          root: classnames(classes.widgetRoot, {
            [classes.noWidgetShadow]: noWidgetShadow,
          }),
        }}
      >
        <div
          className={classnames(classes.widgetHeader, {
            [classes.noPadding]: noHeaderPadding,
            [headerClass!]: headerClass,
          })}
        >
          {header ? (
            header
          ) : (
            <React.Fragment>
              <Typography variant="h5" color="textSecondary" noWrap>
                {title}
              </Typography>
              {!disableWidgetMenu && (
                <IconButton
                  color="primary"
                  classes={{ root: classes.moreButton }}
                  aria-owns="widget-menu"
                  aria-haspopup="true"
                  onClick={() => setMoreMenuOpen(true)}
                  buttonRef={setMoreButtonRef}
                >
                  <MoreIcon />
                </IconButton>
              )}
            </React.Fragment>
          )}
        </div>
        <div
          className={classnames(classes.widgetBody, {
            [classes.noPadding]: noBodyPadding,
            [bodyClass!]: bodyClass,
          })}
        >
          {children}
        </div>
      </Paper>
      <Menu
        id="widget-menu"
        open={isMoreMenuOpen}
        anchorEl={moreButtonRef}
        onClose={() => setMoreMenuOpen(false)}
        disableAutoFocusItem
      >
        <MenuItem>
          <Typography>Edit</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Copy</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Delete</Typography>
        </MenuItem>
        <MenuItem>
          <Typography>Print</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
