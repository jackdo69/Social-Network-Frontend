import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles, styled } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { loadingActions } from '../store/loading';
import { userActions } from '../store/user';
import useHttpClient from '../hooks/http-hook';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
    },
    info: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  }),
);

const CustomPaper = styled(Paper)({
  margin: '0.5em auto',
  width: '25em',
  padding: '0.5em',
});

interface Suggestion {
  id: string;
  username: string;
  image: string;
  isSent: boolean;
}

export default function FriendSuggestions() {
  const [suggestions, setSuggestions] = useState<Suggestion[] | []>([]);
  const classes = useStyles();
  const { makeRequest } = useHttpClient();
  const dispatch = useDispatch();

  const friendSuggestions = useSelector((state: RootState) => state.friend.friendSuggestions);
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
  }, [friendSuggestions, requestSent]);

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
      <Typography align="center" variant="h5" gutterBottom>
        Friends Suggestions
      </Typography>
      {suggestions &&
        suggestions.map((s: Suggestion) => {
          return (
            <CustomPaper key={s.id} variant="outlined">
              <div className={classes.info}>
                <Avatar src={s.image} />
                <Typography variant="overline" display="block" gutterBottom>
                  {s.username}
                </Typography>
                {s.isSent ? (
                  <Button variant="contained" disabled>
                    Pending
                  </Button>
                ) : (
                  <Button color="primary" onClick={() => addFriend({ id: s.id, username: s.username })}>
                    Add Friend
                  </Button>
                )}
              </div>
            </CustomPaper>
          );
        })}
    </div>
  );
}
