import React from 'react';
import { useTheme } from '@material-ui/styles';
import { Theme } from '@material-ui/core';
import { TColor } from '../Wrappers/Wrappers';
// styles
import useStyles from './styles';

// components
import { Typography } from '../Wrappers/Wrappers';
interface Props {
  color?: TColor;
  name: string;
}
export default function UserAvatar({ color = 'primary', ...props }: Props) {
  const classes = useStyles();
  const theme = useTheme<Theme>();

  const letters = props.name
    .split(' ')
    .map((word) => word[0])
    .join('');

  return (
    <div className={classes.avatar} style={{ backgroundColor: theme.palette[color].main }}>
      <Typography className={classes.text}>{letters}</Typography>
    </div>
  );
}
