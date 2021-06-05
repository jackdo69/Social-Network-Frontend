import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Header from "../components/Header";
import Loading from '../components/Loading';
import Toast from '../components/Toast';
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import useForm from "../hooks/form-hook";
import { ContainerProps } from '../interfaces';
import useAuth from '../hooks/auth-hook';

const useStyles = makeStyles((theme) => ({
  fab: {
    position: "absolute",
    bottom: theme.spacing(10),
    right: theme.spacing(10),
  },
}));



export default function Layout(props: ContainerProps) {
  const classes = useStyles();
  const { isLoggedIn } = useAuth();
  const { Form, openForm } = useForm();
  return (
    <div>
      <Loading />
      <Toast />
      {isLoggedIn() && <Header />}
      {Form}
      <Container maxWidth="xl">
        {props.children}
      </Container>
      <Fab
        className={classes.fab}
        color="primary"
        aria-label="add"
        onClick={() => openForm({ action: 'addPost' })}
      >
        <AddIcon />
      </Fab>
    </div>

  );
}
