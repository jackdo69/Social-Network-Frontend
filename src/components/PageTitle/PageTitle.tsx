import React from 'react';

// styles
import useStyles from './styles';

// components
import { Typography } from '../Wrappers/Wrappers';

interface Props {
  title: string;
  button?: React.ReactNode;
}

export default function PageTitle(props: Props) {
  const classes = useStyles();

  return (
    <div className={classes.pageTitleContainer}>
      <Typography className={classes.typo} variant="h1" size="sm">
        {props.title}
      </Typography>
      {props.button && props.button}
    </div>
  );
}
