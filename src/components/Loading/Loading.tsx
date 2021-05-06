import React from "react";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => createStyles({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
}));

export default function useLoading() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const closeLoading = () => {
    setOpen(false);
  };
    const setLoading = () => {
      setOpen(!open);
    };

  const loadingBackdrop = (
    <div>
      <Backdrop className={classes.backdrop} open={open} onClick={closeLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );

  return { loadingBackdrop, closeLoading, setLoading };
}
