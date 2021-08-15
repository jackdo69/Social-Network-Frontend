import { makeStyles } from '@material-ui/styles';

export default makeStyles(() => ({
  wrapper: {
    width: '80%',
    maxWidth: '25em',
    display: 'flex',
    flexDirection: 'column',
  },
  info: {
    display: 'flex',
    justifyContent: 'flex-start',
    margin: '1em',
  },
  seeMore: {
    width: '100%',
  },
}));
