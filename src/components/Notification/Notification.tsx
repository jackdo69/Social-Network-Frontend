/* eslint-disable react/prop-types */
import React from 'react';
import { Button } from '@material-ui/core';
import {
  NotificationsNone as NotificationsIcon,
  ThumbUp as ThumbUpIcon,
  ShoppingCart as ShoppingCartIcon,
  LocalOffer as TicketIcon,
  BusinessCenter as DeliveredIcon,
  SmsFailed as FeedbackIcon,
  DiscFull as DiscIcon,
  Email as MessageIcon,
  Report as ReportIcon,
  Error as DefenceIcon,
  AccountBox as CustomerIcon,
  Done as ShippedIcon,
  Publish as UploadIcon,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/styles';
import classnames from 'classnames';
import tinycolor from 'tinycolor2';

// styles
import useStyles from './styles';

// components
import { Typography } from '../Wrappers/Wrappers';
import { Theme } from '@material-ui/core/styles';
import { TColor } from '../Wrappers/Wrappers';

export const typesIcons = {
  'e-commerce': <ShoppingCartIcon />,
  notification: <NotificationsIcon />,
  offer: <TicketIcon />,
  info: <ThumbUpIcon />,
  message: <MessageIcon />,
  feedback: <FeedbackIcon />,
  customer: <CustomerIcon />,
  shipped: <ShippedIcon />,
  delivered: <DeliveredIcon />,
  defence: <DefenceIcon />,
  report: <ReportIcon />,
  upload: <UploadIcon />,
  disc: <DiscIcon />,
};

interface Props {
  variant?: 'contained' | 'rounded';
  type: keyof typeof typesIcons;
  className?: string;
  shadowless?: Record<string, unknown>;
  color: TColor;
  typographyVariant: 'inherit';
  extraButton?: React.ReactNode;
  extraButtonClick?: () => void;
  message: string;
}

export function Notification({ variant, ...props }: Props) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const icon = getIconByType(props.type);
  const iconWithStyles = React.cloneElement(icon, {
    classes: {
      root: '.MuiIcon-root',
    },
    style: {
      color: variant !== 'contained' && theme.palette[props.color] && theme.palette[props.color].main,
    },
  });

  return (
    <div
      className={classnames(classes.notificationContainer, props.className, {
        [classes.notificationContained]: variant === 'contained',
        [classes.notificationContainedShadowless]: props.shadowless,
      })}
      style={{
        backgroundColor: variant === 'contained' && theme.palette[props.color] ? theme.palette[props.color].main : '',
      }}
    >
      <div
        className={classnames(classes.notificationIconContainer, {
          [classes.notificationIconContainerContained]: variant === 'contained',
          [classes.notificationIconContainerRounded]: variant === 'rounded',
        })}
        style={{
          backgroundColor:
            variant === 'rounded' && theme.palette[props.color]
              ? tinycolor(theme.palette[props.color].main).setAlpha(0.15).toRgbString()
              : '',
        }}
      >
        {iconWithStyles}
      </div>
      <div className={classes.messageContainer}>
        <Typography
          className={classnames({
            [classes.containedTypography]: variant === 'contained',
          })}
          variant={props.typographyVariant}
          size={variant !== 'contained' && !props.typographyVariant ? 'md' : 'sm'}
        >
          {props.message}
        </Typography>
        {props.extraButton && props.extraButtonClick && (
          <Button onClick={props.extraButtonClick} disableRipple className={classes.extraButton}>
            {props.extraButton}
          </Button>
        )}
      </div>
    </div>
  );
}

// ####################################################################
function getIconByType(type: keyof typeof typesIcons = 'offer') {
  return typesIcons[type];
}
