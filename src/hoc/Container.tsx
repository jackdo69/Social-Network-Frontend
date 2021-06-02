import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "../components/Header";
import Loading from '../components/Loading';
import Toast from '../components/Toast';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import usePostForm from "../hooks/post-form-hook";
import { ContainerProps } from '../interfaces';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(10),
    right: theme.spacing(10),
  },
}));



export default function Layout(props: ContainerProps) {
  const classes = useStyles();
  const { Form, openForm } = usePostForm();
  return (
    <div>
      <Loading />
      <Toast />
      <Header />
      {Form}
      <Container maxWidth="xl">
        {props.children}
      </Container>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={() => openForm({ action: 'add' })}
      >
        <AddIcon />
      </Fab>
    </div>

  );
}
