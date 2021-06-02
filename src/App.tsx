import { MuiThemeProvider, createMuiTheme, createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import useAuth from './hooks/auth-hook';
import Container from "./hoc/Container";
//routes
import Homepage from "./pages/Homepage";
import User from "./pages/User";
import Auth from "./pages/Auth";

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#fafafa"
    }
  }
});


const App = () => {
  const { isLoggedIn } = useAuth();


  const routes = (
    <Switch>
      <Route path="/user" render={() => (isLoggedIn() ? <User /> : <Redirect to="/auth" />)} />
      <Route path="/home" render={() => (isLoggedIn() ? <Homepage /> : <Redirect to="/auth" />)} />
      <Route path="/auth" component={Auth} />
      <Redirect to="/home" />
    </Switch>
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Container>{routes}</Container>
      </BrowserRouter>
    </MuiThemeProvider>
  );


};

export default App;
