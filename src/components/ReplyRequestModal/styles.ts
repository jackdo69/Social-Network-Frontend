import { makeStyles, Theme } from '@material-ui/core/styles';

export default makeStyles((theme: Theme) => ({
  avatarWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
  large: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginBottom: theme.spacing(2),
  },
}));
