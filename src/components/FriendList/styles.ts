import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
  },
  info: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '0.4em',
  },
  button: {
    width: '100%',
    textTransform: 'none',
  },
}));
