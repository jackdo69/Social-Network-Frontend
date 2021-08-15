import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '2em',
  },
  avatar: {
    width: '8em',
    height: '8em',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
  },
  badge: {
    margin: '10px auto',
  },
}));
