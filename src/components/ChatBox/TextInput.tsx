import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import SendIcon from '@material-ui/icons/Send';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    wrapForm: {
      display: 'flex',
      justifyContent: 'center',
      width: '95%',
      margin: `${theme.spacing(0)} auto`,
    },
    wrapText: {
      width: '100%',
    },
    button: {
      //margin: theme.spacing(1),
    },
  }),
);

export const TextInput = (props: { send: (e: React.SyntheticEvent, content: string) => void }) => {
  const [content, setContent] = useState('');
  const classes = useStyles();

  function handleKeydown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      setContent('');
      props.send(e, content);
    }
  }
  return (
    <>
      <form className={classes.wrapForm} noValidate autoComplete="off">
        <TextField
          value={content}
          onKeyPress={(e) => handleKeydown(e)}
          onChange={(e) => setContent(e.target.value)}
          id="standard-text"
          label=""
          className={classes.wrapText}
          //margin="normal"
        />
        <Button
          onClick={(e) => {
            props.send(e, content);
            setContent('');
          }}
          size="small"
          color="primary"
          className={classes.button}
        >
          <SendIcon />
        </Button>
      </form>
    </>
  );
};
