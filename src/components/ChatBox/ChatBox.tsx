import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Avatar, Button, Dialog, Paper } from '@material-ui/core';
import { TextInput } from './TextInput';
import { MessageLeft, MessageRight } from './Message';
import { Box } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Message } from '../../interfaces';
import ScrollToBottom from 'react-scroll-to-bottom';
import useHttpClient from '../../hooks/http-hook';

//redux
import { RootState } from '../../store/index';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { chatActions } from '../../store/chat';
import { Typography } from '../Wrappers/Wrappers';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '25vw',
      height: '40vh',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    paper2: {
      width: '22vw',
      maxHeight: '35vh',
      maxWidth: '500px',
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      position: 'relative',
    },
    container: {
      position: 'fixed',
      bottom: theme.spacing(0),
      right: theme.spacing(20),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    messagesBody: {
      width: '22vw',
      margin: 10,
      overflowY: 'scroll',
      height: 'calc( 100% - 110px )',
    },
    header: {
      width: '25vw',
      display: 'flex',
      justifyContent: 'space-between',
    },
    avatar: {
      margin: '0.5em 0em 0.1em 0.5em',
    },
    username: {
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

const socket = io('http://localhost:4000');

export default function ChatBox() {
  const [receiverImage, setReceiverImage] = useState('');
  const [messages, setMessages] = useState<Message[] | []>([]);
  const classes = useStyles();
  const { makeRequest } = useHttpClient();
  const dispatch = useDispatch();

  const show = useSelector((state: RootState) => state.chat.show);
  const receiverId = useSelector((state: RootState) => state.chat.receiverId);
  const receiverUsername = useSelector((state: RootState) => state.chat.receiverUsername);
  const userId = useSelector((state: RootState) => state.user.id);
  useEffect(() => {
    show && getData();
  }, [show]);

  socket.on('server-message', (message) => {
    console.log('incoming message');

    if (message.receiverId === userId) {
      const clonedMessages = [...messages];
      clonedMessages.push(message);
      setMessages(clonedMessages);
    }
  });

  const getData = async () => {
    await getUserImage();
    const userMessages = await getMessages(userId, receiverId);
    const receiverMessages = await getMessages(receiverId, userId);
    const allMessages = [...userMessages, ...receiverMessages].sort((a, b) => a.createdAt - b.createdAt);
    setMessages(allMessages);
  };

  const closeChatbox = () => {
    dispatch(chatActions.closeChat());
  };

  const getUserImage = async () => {
    const result = await makeRequest({
      url: `/user/${receiverId}/getUserImage`,
      method: 'get',
    });
    setReceiverImage(result);
  };

  const getMessages = async (senderId: string, receiverId: string): Promise<Message[] | []> => {
    const result = await makeRequest({
      url: '/message',
      method: 'get',
      params: {
        senderId,
        receiverId,
      },
    });

    if (result && result.length) return result;
    return [];
  };

  const sendMessage = async (e: React.SyntheticEvent, content: string) => {
    e.preventDefault();
    //set the message to the box
    const newMessage = {
      senderId: userId,
      receiverId,
      content,
      createdAt: new Date().getTime(),
    };

    const clonedMessages = [...messages];
    clonedMessages.push(newMessage);
    setMessages(clonedMessages);
    //send the message to the server
    await makeRequest({
      url: '/message',
      method: 'post',
      data: {
        content,
        receiverId,
        senderId: userId,
      },
    });
    //emit socket event
    socket.emit('new-message', newMessage);
  };

  let renderedMessages;
  if (messages && messages.length) {
    renderedMessages = messages.map((mess: Message) => {
      if (mess.senderId === userId) {
        return <MessageRight key={mess.createdAt.toString()} time={mess.createdAt} message={mess.content} />;
      } else {
        return <MessageLeft key={mess.createdAt.toString()} time={mess.createdAt} message={mess.content} />;
      }
    });
  }

  return (
    <Dialog open={show}>
      <Box className={classes.container}>
        <Paper className={classes.paper}>
          <div className={classes.header}>
            <Avatar className={classes.avatar} src={receiverImage} />
            <div className={classes.username}>
              <Typography weight="medium">{receiverUsername}</Typography>
            </div>
            <Button startIcon={<CloseIcon />} onClick={() => closeChatbox()} />
          </div>
          {/* <Paper id="style-1" className={classes.messagesBody}> */}
          <ScrollToBottom className={classes.messagesBody}>{renderedMessages}</ScrollToBottom>
          {/* </Paper> */}
          <TextInput send={sendMessage} />
        </Paper>
      </Box>
    </Dialog>
  );
}
