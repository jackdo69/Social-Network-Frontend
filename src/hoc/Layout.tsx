import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "../components/Header";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import usePostForm from "../components/PostForm";

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(10),
    right: theme.spacing(10),
  },
}));

interface Props {
  children: JSX.Element[] | JSX.Element
}

export default function Layout(props : Props) {
  const classes = useStyles();
  const { Form, openForm } = usePostForm();
  return (
    <div>
      <Header />
      {Form}
      <Container maxWidth="sm">{props.children}</Container>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={openForm}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
