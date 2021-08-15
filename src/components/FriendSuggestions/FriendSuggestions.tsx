import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import { Typography, Button } from '../Wrappers/Wrappers';
import Avatar from '@material-ui/core/Avatar';
import { useSelector, useDispatch } from 'react-redux';
import useStyles from './styles';
import { RootState } from '../../store/index';
import { loadingActions } from '../../store/loading';
import { userActions } from '../../store/user';
import useHttpClient from '../../hooks/http-hook';
import Grid from '@material-ui/core/Grid';

interface Suggestion {
  id: string;
  bio: string;
  username: string;
  image: string;
  isSent: boolean;
}

function suffleArray<T>(arr: Array<T>): Array<T> {
  return arr
    .map((i) => ({ value: i, sort: Math.random() }))
    .sort((a: { sort: number }, b: { sort: number }) => a.sort - b.sort)
    .map(({ value }) => value);
}

export default function FriendSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[] | []>([]);
  const classes = useStyles();
  const { makeRequest } = useHttpClient();
  const dispatch = useDispatch();

  const fSuggestions = useSelector((state: RootState) => state.friend.friendSuggestions);
  const friendSuggestions = suffleArray(fSuggestions).splice(0, 4);
  const userId = useSelector((state: RootState) => state.user.id);
  const requestSent = useSelector((state: RootState) => state.user.requestSent);

  useEffect(() => {
    const suggestionsUpdated = friendSuggestions.map((s) => ({ ...s, isSent: false }));
    const requestSentIds = requestSent?.map((r) => r.id);

    for (const f of suggestionsUpdated) {
      if (requestSentIds?.indexOf(f.id) !== -1) {
        f.isSent = true;
      } else {
        f.isSent = false;
      }
    }
    setSuggestions(suggestionsUpdated);
  }, [fSuggestions, requestSent]);

  const addFriend = async (user: { id: string; username: string }) => {
    dispatch(loadingActions.setLoading({ status: true }));
    await makeRequest({
      url: `/user/${userId}/sendFriendRequest`,
      method: 'post',
      data: {
        recipientId: user.id,
      },
      toastMessage: 'Friend request sent successfully!',
    });
    dispatch(userActions.addRequest({ user }));
    dispatch(loadingActions.setLoading({ status: false }));
  };

  return (
    <div className={classes.wrapper}>
      <Paper elevation={2} variant="outlined">
        {suggestions &&
          suggestions.map((s: Suggestion) => {
            return (
              <Grid container key={s.id} className={classes.info}>
                <Grid item sm={4} md={2} lg={2}>
                  <Avatar src={s.image} />
                </Grid>
                <Grid item sm={8} md={5} lg={5}>
                  <div>
                    <Typography weight="medium">{s.username}</Typography>
                    <Typography color="info" colorBrightness="main">
                      {s.bio}
                    </Typography>
                  </div>
                </Grid>
                <Grid item sm={8} md={4} lg={4}>
                  {s.isSent ? (
                    <Button size="small" variant="contained" disabled>
                      Pending
                    </Button>
                  ) : (
                    <Button size="small" color="primary" onClick={() => addFriend({ id: s.id, username: s.username })}>
                      Add Friend
                    </Button>
                  )}
                </Grid>
              </Grid>
            );
          })}
        <Button className={classes.seeMore}>See more</Button>
      </Paper>
    </div>
  );
}
