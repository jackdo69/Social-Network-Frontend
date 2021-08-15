import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import { Typography, Button } from '../Wrappers/Wrappers';
import useStyles from './styles';
import { RootState } from '../../store/index';
import useHttpClient from '../../hooks/http-hook';
import Grid from '@material-ui/core/Grid';
import TelegramIcon from '@material-ui/icons/Telegram';
import { Theme, withStyles, createStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';

//redux
import { useDispatch } from 'react-redux';
import { chatActions } from '../../store/chat';
import { useSelector } from 'react-redux';

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      backgroundColor: '#44b700',
      color: '#44b700',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: '$ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }),
)(Badge);

interface Friend {
  id: string;
  username: string;
  image: string;
}

export default function FriendList(props: { close: () => void }) {
  const classes = useStyles();
  const [friendList, setFriendList] = useState<Friend[] | []>([]);
  const userFriendList = useSelector((state: RootState) => state.user.friends);
  const { makeRequest } = useHttpClient();
  const dispatch = useDispatch();

  const getFriendListWith = async () => {
    if (userFriendList && userFriendList.length) {
      const result = await Promise.all(
        userFriendList?.map(async (f: { id: string; username: string }) => {
          const { id, username } = f;
          const image = await makeRequest({
            url: `/user/${f.id}/getUserImage`,
            method: 'get',
          });
          return { id, username, image };
        }),
      );
      setFriendList(result);
    }
  };

  const openChatbox = ({ id, username }: { id: string; username: string }) => {
    dispatch(chatActions.openChat({ receiverId: id, receiverUsername: username }));
  };

  useEffect(() => {
    getFriendListWith();
  }, [userFriendList]);

  return (
    <div className={classes.wrapper}>
      {friendList &&
        friendList.map((f: Friend) => {
          return (
            <Grid container key={f.id} className={classes.info}>
              <Grid item sm={4} md={2} lg={2}>
                <StyledBadge
                  overlap="circle"
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  variant="dot"
                >
                  <Avatar src={f.image} />
                </StyledBadge>
              </Grid>
              <Grid item sm={8} md={8} lg={8}>
                <Button
                  className={classes.button}
                  endIcon={<TelegramIcon />}
                  size="small"
                  onClick={() => {
                    openChatbox({ id: f.id, username: f.username });
                    props.close();
                  }}
                >
                  <Typography weight="medium">{f.username}</Typography>
                </Button>
              </Grid>
            </Grid>
          );
        })}
    </div>
  );
}
