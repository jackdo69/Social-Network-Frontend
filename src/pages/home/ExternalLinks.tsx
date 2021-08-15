import React from 'react';
import { makeStyles } from '@material-ui/styles';
import Paper from '@material-ui/core/Paper';
import { Typography } from '@material-ui/core';
import HistoryIcon from '@material-ui/icons/History';
import GroupIcon from '@material-ui/icons/Group';
import EventIcon from '@material-ui/icons/Event';
import { Button } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  wrapper: {
    marginTop: '2em',
    width: '80%',
    maxWidth: '25em',
    display: 'flex',
    flexDirection: 'column',
  },
  item: {
    margin: '0.3em 0em 0.1em 1em',
  },
}));

const recents = ['IT company', 'Tourism', 'Supermarket'];
const groups = ['Photographer', 'Designer', 'Coder'];
const events = ['Hackathon2021', 'SuperNova', 'GlobalSummit22'];

export default function ExternalLinks() {
  const classes = useStyles();

  const recentDisplay = recents.map((item) => {
    return (
      <div key={item}>
        <Button className={classes.item} startIcon={<HistoryIcon />}>
          {item}
        </Button>
      </div>
    );
  });

  const groupDisplay = groups.map((item) => {
    return (
      <div key={item}>
        <Button className={classes.item} startIcon={<GroupIcon />}>
          {item}
        </Button>
      </div>
    );
  });

  const eventDisplay = events.map((item) => {
    return (
      <div key={item}>
        <Button className={classes.item} startIcon={<EventIcon />}>
          {item}
        </Button>
      </div>
    );
  });

  return (
    <div className={classes.wrapper}>
      <Paper>
        <Typography className={classes.item}># Recent</Typography>
        {recentDisplay}
        <Typography className={classes.item}># Groups</Typography>
        {groupDisplay}
        <Typography className={classes.item}># Events</Typography>
        {eventDisplay}
        <Button fullWidth>See more</Button>
      </Paper>
    </div>
  );
}
