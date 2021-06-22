import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/index';
import { loadingActions } from '../store/loading';

const useStyles = makeStyles((theme: Theme) => createStyles({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function Loading() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const status = useSelector((state: RootState) => state.loading.show);
  const closeLoading = () => {
    dispatch(loadingActions.setLoading({ status: false }));
  };

  return (
    <div>
      <Backdrop className={classes.backdrop} open={status} onClick={closeLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );

};

